import expresss from "express";
import { register, login, verifyToken, logout } from "../Controllers/auth.js";

const router = expresss.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/check", verifyToken, (req, res) => {
  res.json({ user: req.user });
});

export default router;
