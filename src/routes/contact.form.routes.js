import express from "express";
import { getAllFormResponses, createFormResponse } from "../controllers/contactFormResponse.js";

const router = express.Router();

router.post("/", createFormResponse);
router.get("/", getAllFormResponses);


export default router;
