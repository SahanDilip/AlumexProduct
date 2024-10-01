import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import fs from "fs";

import xlsx from "xlsx";
import path from "path";
import { fileURLToPath } from "url";

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const credentials = JSON.parse(
  fs.readFileSync("alumex-437317-bda73c2c9d22.json")
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
    const { size, grade, sheet } = req.query;

    await doc.loadInfo();
    const spreadsheet = doc.sheetsByTitle[sheet];
    const rows = await spreadsheet.getRows();

    const filteredRows = rows.filter(
      (row) => row._rawData[2] === size && row._rawData[1] === grade
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

    const backupDirPath = path.join(__dirname, "assets");
    if (!fs.existsSync(backupDirPath)) {
      fs.mkdirSync(backupDirPath, { recursive: true });
    }
    const backupFilePath = path.join(backupDirPath, "backup.xlsx");

    let workbook;
    let worksheet;

    // Check if the backup file exists
    if (fs.existsSync(backupFilePath)) {
      workbook = xlsx.readFile(backupFilePath);
      worksheet = workbook.Sheets[sheet];

      if (!worksheet) {
        // If the worksheet doesn't exist, create a new one
        worksheet = xlsx.utils.json_to_sheet([]);
        xlsx.utils.book_append_sheet(workbook, worksheet, sheet);
      }
    } else {
      workbook = xlsx.utils.book_new(); // Create a new workbook
      worksheet = xlsx.utils.json_to_sheet([]); // Create a new sheet
      xlsx.utils.book_append_sheet(workbook, worksheet, sheet); // Append the new sheet to the workbook
    }

    // Convert the new data to a format suitable for Excel
    const newData = [data];
    xlsx.utils.sheet_add_json(worksheet, newData, {
      skipHeader: true,
      origin: -1,
    });

    // Write the workbook to the file
    xlsx.writeFile(workbook, backupFilePath);

    res.status(200).json({ message: "Data added successfully" });
  } catch (error) {
    next(error);
  }
};
