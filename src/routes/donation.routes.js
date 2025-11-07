import express from "express";
import { getDonations, createDonation } from "../controllers/donationsControllers.js";

const router = express.Router();

router.get("/", getDonations);
router.post("/", createDonation);

export default router;
