import expresss from "express";
import { register, login, verifyToken } from "../Controllers/auth.js";
import dotenv from "dotenv";

const router = expresss.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/check", verifyToken, (req, res) => {
  res.json({ user: req.user });
});

export default router;
