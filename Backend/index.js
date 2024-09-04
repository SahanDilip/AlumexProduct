import express from "express";
import sheetRouter from "./Routes/sheet.js";

const app = express();
app.use(express.json());

app.use("/sheet", sheetRouter);

app.listen(5001, () => {
  console.log("Server is running on port 5001");
});
