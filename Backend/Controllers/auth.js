import dotenv from "dotenv";
import { connection } from "../index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
dotenv.config();

export const register = async (req, res, next) => {
  try {
    const {
      email,
      phone_number,
      full_name,
      gender,
      avatar,
      address,
      birthday,
      role,

      password,
    } = req.body;

    // Check if the email already exists
    const [existingUsers] = await connection.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const defaultAvatar =
      "https://firebasestorage.googleapis.com/v0/b/medilink-812fc.appspot.com/o/person.png?alt=media&token=510412a5-bfd5-423d-b65d-f3b2a206e88d";

    console.log(req.body);
    const [result] = await connection.query(
      "INSERT INTO users (email, phone_number, full_name, gender, avatar, address, birthday, role, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        email,
        phone_number,
        full_name,
        gender,
        avatar || defaultAvatar,
        address,
        birthday,
        role,
        hashedPassword,
      ]
    );

    // Return the newly created user with the inserted id
    res.json({
      email,
      phone_number,
      full_name,
      gender,
      avatar,
      address,
      birthday,
      role,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if the email exists
    const [users] = await connection.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (users.length === 0) {
      return res.status(400).json("Invalid email or password");
    }

    const user = users[0];

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json("Invalid email or password");
    }

    const token = jwt.sign(
      { email: user.email, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
    res.json({ token, role: user.role });
  } catch (error) {
    next(error);
  }
};

export const verifyToken = (req, res, next) => {
  const token =
    req.cookies?.authToken || req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    return res.status(403).json({ message: "Invalid token" });
  }
};
