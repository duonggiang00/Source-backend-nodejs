import { Router } from "express";
import { createProduct, deleteProduct, getDetailProduct, getListProduct, updateProduct, softDeleteProduct } from "./product.controller.js";

const productRoutes = Router()

productRoutes.get("/",getListProduct)
productRoutes.get("/:id",getDetailProduct)//detail
productRoutes.post("/",createProduct) //them
productRoutes.patch("/:id",updateProduct) //cap nhat
productRoutes.delete("/:id",deleteProduct) //delete
productRoutes.delete("/soft-delete/:id",softDeleteProduct) //delete

export default productRoutes