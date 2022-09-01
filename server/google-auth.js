const { google } = require('googleapis');

/**
 * Search file in drive location
 * @return{obj} data file
 * */
async function searchFile() {
  // Get credentials and build service
  // TODO (developer) - Use appropriate auth mechanism for your app
  const service = google.drive({
    version: 'v3',
    auth: process.env.GOOGLE_API_KEY,
    // auth: 'dfgfghfhdfghdfghfgh',
  });

  const files = [];

  try {
    const res = await service.files.list({
      q: "mimeType='image/jpeg'",
      fields: 'nextPageToken, files(id, name)',
      spaces: 'drive',
    });

    Array.prototype.push.apply(files, res.files);

    res.data.files.forEach(function (file) {
      console.log('Found file:', file.name, file.id);
    });

    return res.data.files;
  } catch (err) {
    // TODO(developer) - Handle error
    throw err;
  }
}

searchFile();
