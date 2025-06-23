import { Router } from "express";
import validBodyRequest from "../../common/middlewares/validBodyRequest.js";
import productSchema from "./product.schema.js";
import { createProduct, deleteProduct, getDetailProduct, getListProduct, softDeleteProduct, updateProduct } from "./product.controller.js";

const productRoutes = Router()

productRoutes.post("/", validBodyRequest(productSchema), createProduct)
productRoutes.get("/", getListProduct)
productRoutes.get("/:id", getDetailProduct)
productRoutes.patch("/:id", updateProduct)
productRoutes.delete("/:id", deleteProduct)
productRoutes.delete("/soft-delete/:id", softDeleteProduct)

export default productRoutes