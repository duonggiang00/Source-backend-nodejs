import { Router } from "express";
import { createSubCategory, deleteSubCategory, getDetailSubCategory, getListSubCategory, softDeleteSubCategory, updateSubCategory } from "./subcategory.controller.js";
import subCategorySchema from "./subCategory.schema.js";
import validBodyRequest from "../../common/middlewares/validBodyRequest.js";


const subCategoryRoutes = Router()

subCategoryRoutes.post("/", validBodyRequest(subCategorySchema),createSubCategory)
subCategoryRoutes.get("/",getListSubCategory)
subCategoryRoutes.get("/:id",getDetailSubCategory)
subCategoryRoutes.patch("/:id",updateSubCategory) //cap nhat
subCategoryRoutes.delete("/:id",deleteSubCategory) //delete
subCategoryRoutes.delete("/soft-delete/:id",softDeleteSubCategory) //delete

export default subCategoryRoutes