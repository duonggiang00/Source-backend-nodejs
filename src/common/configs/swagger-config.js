import fs from "fs"
import swaggerUi from "swagger-ui-express"
const swaggerDocument = JSON.parse(fs.readFileSync("./src/common/configs/swagger-output.json", "utf8"));

const setupSwagger = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

export default setupSwagger;
