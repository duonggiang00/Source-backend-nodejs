import express from 'express'
import router from './src/routers/index.js';
import connectDB from './src/common/configs/db.js';
import { HOST, PORT } from './src/common/configs/enviroment.js';
import errorHandler from './src/common/middlewares/errorHandle.js';
import setupSwagger from './src/common/configs/swagger-config.js';
import cors from "cors";
connectDB();

const app = express()

app.use(express.json())

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use("/api", router)

setupSwagger(app);

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`server running at http://${HOST}:${PORT}/api`)
    console.log(`Swagger Docs available at http://${HOST}:${PORT}/api-docs`);
});