const { google } = require("googleapis");

module.exports = async (spreadsheetId, range) => {
  try {
    const auth = await google.auth.getClient({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n").trim()
      },
      scopes: "https://www.googleapis.com/auth/spreadsheets.readonly"
    });

    const { spreadsheets } = google.sheets({ version: "v4", auth });

    const { data } = await spreadsheets.values.get({
      spreadsheetId,
      range
    });

    return data.values;
  } catch (err) {
    throw err;
  }
};
