import express from "express";
import { deleteAdmin, getAllAdmins, loginAdmin, logoutAdmin, registerAdmin } from "../controllers/adminAuthController.js";
import { verifyAccessToken } from "../middleware/authMiddleware.js";
import { refreshAccessToken } from "../controllers/adminAuthController.js";
const router = express.Router()

router.post('/register', registerAdmin)
// router.post('/login', loginAdmin) 
// router.delete('/delete/:id', verifyToken, deleteAdmin)
// router.get('/admins', getAllAdmins);

router.post('/login', loginAdmin);
router.post('/refresh', refreshAccessToken);
router.post('/logout', logoutAdmin);

router.get('/admins', verifyAccessToken, getAllAdmins);
router.delete('/delete/:id', verifyAccessToken, deleteAdmin);


export default router;