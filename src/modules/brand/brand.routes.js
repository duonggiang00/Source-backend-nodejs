import { Router } from "express";
import { createBrand, deleteBrand, getDetailBrand, getListBrand, restoreBrand, softDeleteBrand, updateBrand } from "./brand.controller.js";


const brandRoutes = Router();

brandRoutes.get("/", getListBrand);

brandRoutes.get("/:id", getDetailBrand);

brandRoutes.post("/", createBrand);

brandRoutes.put("/:id", updateBrand);
brandRoutes.delete("/:id", deleteBrand);

brandRoutes.patch("/:id/soft-delete", softDeleteBrand);
brandRoutes.patch("/:id/restore", restoreBrand);

export default brandRoutes;