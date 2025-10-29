import express from "express";
import { deleteAdmin, getAllAdmins, loginAdmin, registerAdmin } from "../controllers/adminAuthController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router()

router.post('/register', registerAdmin)
router.post('/login', loginAdmin) 
router.delete('/delete/:id', verifyToken, deleteAdmin)
router.get('/admins', getAllAdmins);
export default router;