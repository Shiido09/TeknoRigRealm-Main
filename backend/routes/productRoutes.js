import express from "express";
import multer from "multer";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getAdminStats,
  createProductReview
} from "../controllers/productController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // Temporary storage for file uploads

router.post("/", upload.array("product_images", 5), createProduct); // Max 5 images
router.get("/", getProducts);
router.get("/adminStats", getAdminStats);
router.get("/:id", getProductById);
router.put("/:id", upload.array("product_images", 5), updateProduct);
router.delete("/:id", deleteProduct);
router.post("/:id/reviews", createProductReview);

export default router;
