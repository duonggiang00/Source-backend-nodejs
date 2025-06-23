import { Router } from "express";
import { loginSchema, registerSchema } from "./auth.schema.js";
import validBodyRequest from "../../common/middlewares/validBodyRequest.js";
import { authLogin, authRegister } from "./auth.controller.js";

const authRoutes = Router();

authRoutes.post("/login", validBodyRequest(loginSchema), authLogin)
authRoutes.post("/register", validBodyRequest(registerSchema), authRegister);


export default authRoutes