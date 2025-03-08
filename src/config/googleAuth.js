const { google } = require('googleapis');
require('dotenv').config();

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.REDIRECT_URI
);

// Hàm này giả định bạn đã có access token từ OAuth flow
oAuth2Client.setCredentials({
  access_token: 'your_access_token', // Thay bằng token thực tế sau khi xác thực
});

module.exports = { oAuth2Client };