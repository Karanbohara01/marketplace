import express from "express";
import {
  deleteProduct,
  getProducts,
  postProduct,
  updateProduct,
} from "../controllers/products.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/postproducts", protectRoute, postProduct);
router.get("/getproducts", getProducts);
router.put("/updateproducts/:id", protectRoute, updateProduct);
router.delete("/deleteproducts/:id", protectRoute, deleteProduct);
export default router;
