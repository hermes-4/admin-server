import express from "express";
import {
  createCategory,
  getCategories,
  deleteCategories,
  updateCategory,
  getCategoryById,
} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/", createCategory);
router.get("/", getCategories);
router.delete("/:id", deleteCategories);
router.patch("/:id", updateCategory);
router.get("/:id", getCategoryById);


export default router;
