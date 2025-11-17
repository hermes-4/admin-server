import express from "express";
import { addImages, deleteImage, getGallery, updateGallery } from "../controllers/galleryController.js";

const router = express.Router();

router.get("/", getGallery)
router.post("/", addImages)
router.put("/", updateGallery)
router.delete("/:id", deleteImage)
export default router;