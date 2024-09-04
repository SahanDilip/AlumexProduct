import expresss from "express";
import { getData, addData } from "../Controllers/sheet.js";

const router = expresss.Router();

router.get("/", getData);
router.post("/", addData);

export default router;
