require("dotenv").config();
const { google } = require("googleapis");
const stream = require("stream");
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;
const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

var that = (module.exports = {
  setFilePublic: async (fileId) => {
    try {
      await drive.permissions.create({
        fileId,
        requestBody: {
          role: "reader",
          type: "anyone",
        },
      });

      const getUrl = await drive.files.get({
        fileId,
        fields: "webViewLink, webContentLink",
      });

      return getUrl;
    } catch (error) {
      console.error(error);
    }
  },
  uploadFile: async ({ shared }, file) => {
    try {
      let bufferStream = new stream.PassThrough();
      bufferStream.end(file.buffer);
      const createFile = await drive.files.create({
        requestBody: {
          name: file.originalname,
          mimeType: "image/png",
        },
        media: {
          mimeType: "image/png",
          body: bufferStream,
        },
      });
      const fileId = createFile.data.id;
      console.log(createFile.data);
      const getUrl = await that.setFilePublic(fileId);

      //   console.log(getUrl.data);
      return { fileId };
    } catch (error) {
      //   console.error(error);
      return error;
    }
  },
  deleteFile: async (fileId) => {
    try {
      console.log("Delete File:::", fileId);
      const deleteFile = await drive.files.delete({
        fileId: fileId,
      });
      return deleteFile;
    } catch (error) {
      console.error(error);
    }
  },
});
