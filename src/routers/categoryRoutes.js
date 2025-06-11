import { Router } from "express";
import { createCategory, deleteCategory, getDetailCategory, getListCategory, softDeleteCategory, updateCategory } from "../controllers/categoryController.js";

const categoryRoutes = Router()

categoryRoutes.post("/",createCategory)
categoryRoutes.get("/",getListCategory)
categoryRoutes.get("/:id",getDetailCategory)
categoryRoutes.patch("/:id",updateCategory) //cap nhat
categoryRoutes.delete("/:id",deleteCategory) //delete
categoryRoutes.delete("/soft-delete/:id",softDeleteCategory) //delete

export default categoryRoutes