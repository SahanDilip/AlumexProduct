import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import fs from "fs";

const credentials = JSON.parse(
  fs.readFileSync("carbon-compound-434603-b2-33a8c9212c39.json")
);

const serviceAccountAuth = new JWT({
  email: credentials.client_email,
  key: credentials.private_key,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const doc = new GoogleSpreadsheet(
  "120t21BYaJgYw9TV0tTPxJJDjvsuetiblTyEP8orJDro",
  serviceAccountAuth
);

export const getData = async (req, res, next) => {
  try {
    const { size, date, grade, sheet } = req.query;
    await doc.loadInfo();

    const spreadsheet = doc.sheetsByTitle[sheet];
    const rows = await spreadsheet.getRows();

    const filteredRows = rows.filter(
      (row) =>
        row._rawData[0] === date &&
        row._rawData[2] === size &&
        row._rawData[1] === grade
    );

    if (filteredRows.length > 0) {
      const headers = spreadsheet.headerValues;

      const data = filteredRows.map((filteredRow) =>
        headers.reduce((acc, header, index) => {
          acc[header] = filteredRow._rawData[index];
          return acc;
        }, {})
      );

      res.json(data);
    } else {
      res.json([]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
};

export const addData = async (req, res, next) => {
  try {
    const { data, sheet } = req.body;
    await doc.loadInfo();

    const spreadsheet = doc.sheetsByTitle[sheet];
    await spreadsheet.addRow(data);

    res.status(200).json({ message: "Data added successfully" });
  } catch (error) {
    next(error);
  }
};
