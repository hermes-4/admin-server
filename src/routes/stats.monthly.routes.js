import express from "express"
import { getMonthlyStats } from "../controllers/statsController.js";
const router = express.Router();

router.get("/monthly", getMonthlyStats)
export default router;

