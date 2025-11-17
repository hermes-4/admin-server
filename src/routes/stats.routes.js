import express from "express"
import { getStats } from "../controllers/statsController";
const router = express.Router();

router.get("/", getStats)
router.get("/monthly")
export default router;