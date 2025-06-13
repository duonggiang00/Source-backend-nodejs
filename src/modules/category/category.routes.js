import { Router } from "express";
import { createCategory, deleteCategory, getDetailCategory, getListCategory, softDeleteCategory, updateCategory } from "./category.controller.js";
import categorySchema from "./category.schema.js";
import validBodyRequest from "../../common/middlewares/validBodyRequest.js";


const categoryRoutes = Router()

categoryRoutes.post("/", validBodyRequest(categorySchema),createCategory)
categoryRoutes.get("/",getListCategory)
categoryRoutes.get("/:id",getDetailCategory)
categoryRoutes.patch("/:id",updateCategory) //cap nhat
categoryRoutes.delete("/:id",deleteCategory) //delete
categoryRoutes.delete("/soft-delete/:id",softDeleteCategory) //delete

export default categoryRoutes