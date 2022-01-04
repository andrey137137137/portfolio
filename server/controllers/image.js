const { IncomingForm } = require('formidable');
const path = require('path');
const fs = require('fs');
const { waterfall, each } = require('async');
const { UPLOAD_PATH } = require('@config').client;
const { ERROR } = require('@httpSt');
const { sendError, sendResult } = require('@contr/crud');
const { google } = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
function readCredentials(action = 'uploadFile') {
  fs.readFile('credentials.json', (err, content) => {
    if (err) {
      console.log('Error loading client secret file:', err);
      return false;
    }
    // Authorize a client with credentials, then call the Google Drive API.
    authorize(JSON.parse(content), action);
  });
}

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
    callback(oAuth2Client);
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
      callback(oAuth2Client);
    });
  });
}

/**
 * Lists the names and IDs of up to 10 files.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listFiles(auth) {
  const drive = google.drive({ version: 'v3', auth });
  drive.files.list(
    {
      pageSize: 10,
      fields: 'nextPageToken, files(id, name)',
    },
    (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      const files = res.data.files;
      if (files.length) {
        console.log('Files:');
        files.map(file => {
          console.log(`${file.name} (${file.id})`);
        });
      } else {
        console.log('No files found.');
      }
    },
  );
}

/**
 * Describe with given media and metaData and upload it using google.drive.create method()
 */
function uploadFile(auth) {
  const drive = google.drive({ version: 'v3', auth });
  const fileMetadata = {
    name: 'photo.jpg',
  };
  const media = {
    mimeType: 'image/jpeg',
    body: fs.createReadStream('files/photo.jpg'),
  };
  drive.files.create(
    {
      resource: fileMetadata,
      media: media,
      fields: 'id',
    },
    (err, file) => {
      if (err) {
        // Handle error
        console.error(err);
      } else {
        console.log('File Id: ', file.id);
      }
    },
  );
}

let uploadPath;

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

    const filePath = files.image.path;
    const fileName = files.image.name;

    fs.rename(filePath, path.join(uploadPath, fileName), err => {
      sendMessage(res, err, {
        success: 'Изображение успешно добавлено',
        error: 'Не удалось переместить изображение',
      });
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
