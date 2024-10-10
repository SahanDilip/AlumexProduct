import expresss from "express";
import { getData, addData } from "../Controllers/sheet.js";
import { verifyRoles } from "../Middlewares/VerifyRoles.js";
import { verifyToken } from "../Controllers/auth.js";
import { getMeltingData } from "../Controllers/sheet.js";

const router = expresss.Router();

router.get("/", getData);
router.get("/getMeltingData",getMeltingData)
router.post("/", verifyToken, verifyRoles("admin"), addData);

export default router;
