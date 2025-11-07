import express from "express";
import { getContactInfo, updateContactInfo } from "../controllers/contactInfoController.js";

const router = express.Router();

router.get("/", getContactInfo);
router.patch("/", updateContactInfo); 

export default router;
