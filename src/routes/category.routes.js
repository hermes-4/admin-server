import express from "express";
import {
  createCategory,
  getCategories,
  deleteCategories,
  updateCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/", createCategory);
router.get("/", getCategories);
router.delete("/:id", deleteCategories);
router.patch("/:id", updateCategory);


export default router;
