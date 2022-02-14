const { IncomingForm } = require('formidable');
const path = require('path');
const fs = require('fs');
const { waterfall, each } = require('async');
const { UPLOAD_PATH } = require('@config').client;
const { ERROR } = require('@httpSt');
const { sendError, sendResult } = require('@contr/crud');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

let uploadPath;

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0],
  );

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) {
      return getAccessToken(oAuth2Client, callback);
    }
    oAuth2Client.setCredentials(JSON.parse(token));
    return callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', code => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) {
        return console.error('Error retrieving access token', err);
      }
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), err => {
        if (err) {
          return console.error(err);
        }
        console.log('Token stored to', TOKEN_PATH);
      });
      return callback(oAuth2Client);
    });
  });
}

function getS3Drive(auth) {
  const { google } = require('googleapis');
  return google.drive({ version: 'v3', auth });
}

/**
 * Describe with given media and metaData and upload it using google.drive.create method()
 */
function uploadFile(auth, file, cb) {
  // const drive = google.drive({ version: 'v3', auth });
  const { name, path } = file;
  getS3Drive(auth).files.create(
    {
      resource: { name },
      media: {
        mimeType: 'image/jpeg',
        body: fs.createReadStream(path + '/' + name),
      },
      fields: 'id',
    },
    (err, file) => {
      // if (err) {
      //   // Handle error
      //   console.error(err);
      // } else {
      //   console.log('File Id: ', file.id);
      // }
      return cb(err, file);
    },
  );
}

function deleteFile(auth, file, cb) {
  // var fileId = '1vuZs3N8qnevNEETCKnZQ5js0HOCpGTxs'; // Desired file id to download from  google drive

  // const drive = google.drive({ version: 'v3', auth }); // Authenticating drive API

  // Deleting the image from Drive
  getS3Drive(auth).files.delete({ fileId: file.id }, (err, file) => {
    return cb(err, file);
  });
  // .then(
  //   async function (response) {
  //     res.status(204).json({ status: 'success' });
  //   },
  //   function (err) {
  //     return res
  //       .status(400)
  //       .json({ errors: [{ msg: 'Deletion Failed for some reason' }] });
  //   },
  // );
}

function action(
  res,
  actionMessages,
  file = {},
  method = 'uploadFile',
  cb = false,
) {
  const messages = {
    success: 'Изображение успешно добавлено',
    error: 'Error loading client secret file:',
  };
  waterfall(
    [
      cb => {
        fs.readFile('credentials.json', cb);
      },
      (content, cb) => {
        console.log(content);
        authorize(JSON.parse(content), cb);
      },
      (auth, cb) => {
        const { success, error } = actionMessages;
        messages.success = success;
        messages.error = error;
        [method](auth, file, cb);
      },
    ],
    (err, info) => {
      if (cb !== false) {
        return cb(err, info);
      }

      const { success, error } = messages;
      sendMessage(res, err, { success, error }, err);
    },
  );
}

const sendMessage = (res, err, messages, info = false) => {
  if (err) {
    return res.status(ERROR).json({ message: messages.error });
  }

  const data = { message: messages.success };

  if (info) {
    data.info = info;
  }

  res.send(data);
};

const makeDir = dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

const setUploadPath = (dir, layer = -1) => {
  makeDir(UPLOAD_PATH);

  uploadPath = dir ? path.join(UPLOAD_PATH, dir) : UPLOAD_PATH;

  if (layer >= 0) {
    uploadPath = path.join(uploadPath, 'layer_' + layer);
  }

  makeDir(uploadPath);
};

const getUploadPath = () => {
  return uploadPath;
};

const getTempPath = (dir, layer = -1) => {
  setUploadPath(dir, layer);
  return path.join(process.cwd(), uploadPath);
};

const upload = (req, res, dir = '', layer = -1) => {
  const form = new IncomingForm();

  form.uploadDir = getTempPath(dir, layer);
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(ERROR).json({
        message: 'Не удалось загрузить изображение',
      });
    }

    // const filePath = files.image.path;
    // const fileName = files.image.name;

    // fs.rename(filePath, path.join(uploadPath, fileName), err => {
    //   sendMessage(res, err, {
    //     success: 'Изображение успешно добавлено',
    //     error: 'Не удалось переместить изображение',
    //   });
    // });

    action(res, files.image, {
      success: 'Изображение успешно добавлено',
      error: 'Не удалось переместить изображение',
    });
  });
};

const remove = (res, imageName, dir = '', layer = -1, cb = false) => {
  setUploadPath(dir, layer);

  const IMAGE_PATH = path.join(uploadPath, imageName);
  console.log(IMAGE_PATH);

  if (cb !== false) {
    return fs.unlink(IMAGE_PATH, cb);
  }

  fs.unlink(IMAGE_PATH, err => {
    sendMessage(res, err, {
      success: 'Изображение успешно удалено',
      error: 'Не удалось удалить изображение',
    });
  });
};

const isAnyBreakpointImage = (dir, breakpoints, layer = -1) => {
  setUploadPath(dir, layer);

  for (let index = 0; index < breakpoints.length; index++) {
    const checkingPath = path.join(getUploadPath(), breakpoints[index]);
    console.log(checkingPath);

    if (fs.existsSync(checkingPath)) {
      return true;
    }
  }

  return false;
};

const deleteBreakpointImages = (dir, data, breakpoints, highCB, layer = -1) => {
  setUploadPath(dir, layer);
  each(
    breakpoints,
    (breakpoint, cb) => {
      const deleteUploadPath = path.join(getUploadPath(), breakpoint);

      if (fs.existsSync(deleteUploadPath)) {
        fs.unlink(deleteUploadPath, cb);
      } else {
        cb(null, data);
      }
    },
    (err, info) => {
      console.log(err);
      return highCB(err, info);
    },
  );
};

const waterfallCB = (err, result, res, mode) => {
  if (err) {
    return sendError(err, res, mode);
  }
  return sendResult(result, res, mode);
};

const startWaterfall = (res, mode, cbArray, images = []) => {
  waterfall(cbArray, (err, result) => {
    // return fs.unlink(image.path, (err, result) => {
    //   return waterfallCB(err, result, { res, mode, image });
    // });

    each(
      images.filter(item => !!item),
      (image, cb) => {
        fs.unlink(image.path, cb);
      },
      err => {
        return waterfallCB(err, result, res, mode);
      },
    );
  });
};

module.exports = {
  sendMessage,
  makeDir,
  setUploadPath,
  getUploadPath,
  getTempPath,
  upload,
  remove,
  isAnyBreakpointImage,
  deleteBreakpointImages,
  startWaterfall,
  waterfallCB,
};
