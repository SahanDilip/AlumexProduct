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
  "1Y9GFRnXY8bj1fqnNDahDFeMiQySBPP0kz92Qe9zaDuQ",
  serviceAccountAuth
);

export const getData = async (req, res, next) => {
  try {
    const { date } = req.query;
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0];

    const rows = await sheet.getRows();
    const filteredRow = rows.find((row) => row._rawData[0] === date);
    const data = filteredRow ? filteredRow._rawData : null;
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const addData = async (req, res, next) => {
  try {
    const { data } = req.body;
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0];
    await sheet.addRow(data);

    res.json({ message: "Data added successfully" });
  } catch (error) {
    next(error);
  }
};
