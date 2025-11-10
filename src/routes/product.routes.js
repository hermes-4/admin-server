import express from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} from "../controllers/productControllers.js";

const router = express.Router();

router.get("/", getProducts);         
router.post("/", createProduct);      
router.patch("/:id", updateProduct);  
router.delete("/:id", deleteProduct); 
router.get("/:id", getProductById);

export default router;
