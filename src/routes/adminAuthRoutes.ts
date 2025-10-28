import express from "express";
import { loginAdmin, registerAdmin } from "../controllers/adminAuthController";
const router = express.Router()

router.post('/register', registerAdmin)
router.post('/login', loginAdmin)

export default router;