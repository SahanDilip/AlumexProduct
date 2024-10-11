import express from "express";
import sheetRouter from "./Routes/sheet.js";
import cors from "cors";
import authRouter from "./Routes/auth.js";
import mysql from "mysql2";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.json());
const corsOptions = {
  origin: "*", 
  credentials: true, 
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  Promise: global.Promise,
});

export const connection = pool.promise();

app.use("/api/sheet", sheetRouter);
app.use("/api/auth", authRouter);

app.listen(5001, () => {
  console.log("Server is running on port 5001");
});
