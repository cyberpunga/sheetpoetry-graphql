const { google } = require("googleapis");

const getSheet = async (spreadsheetId, range) => {
  try {
    const auth = await google.auth.getClient({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(
          /\\n/g,
          "\n"
        ).trim(),
      },
      scopes: "https://www.googleapis.com/auth/spreadsheets.readonly",
    });

    const { spreadsheets } = google.sheets({ version: "v4", auth });
    const { data } = await spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    return data.values;
  } catch (err) {
    throw err;
  }
};

const sheetPoetry = async (spreadsheetId, range, howMany) => {
  const values = await getSheet(spreadsheetId, range);
  const randomRow = () => values[Math.floor(Math.random() * values.length)];
  const sheetVerse = () => randomRow().map((cell, index) => randomRow()[index]);
  const sheetPoem = (howMany) => {
    let poem = [];
    for (let i = 0; i < howMany; i++) {
      poem.push(sheetVerse().join(" "));
    }
    return poem;
  };
  return sheetPoem(howMany).join("\n");
};

module.exports = {
  getSheet,
  sheetPoetry,
};
