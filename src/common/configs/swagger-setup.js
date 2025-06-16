
import swaggerAutogen from "swagger-autogen";
import { HOST, PORT } from "./enviroment.js";


swaggerAutogen();

const outputFile = "./src/common/configs/swagger-output.json";
const endpointsFiles = ["./src/routers/index.js"];

const swaggerConfig = {
    info: {
        title: "Backend API Codefarm Ecommerce",
        description: "API CodeFarm",
        version: "1.0.0",
    },
    host: `${HOST}:${PORT}`,
    basePath: "/api",
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],

    securityDefinitions: {
        BearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
        },
    },
};

swaggerAutogen()(outputFile, endpointsFiles, swaggerConfig);