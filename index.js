import express from 'express'
import router from './src/routers/index.js';
import connectDB from './src/common/configs/db.js';
import { HOST, PORT } from './src/common/configs/enviroment.js';

connectDB();

const app = express()

app.use(express.json())

app.use("/api",router)

app.listen(PORT, HOST, () => {
    console.log(`server running at http://${HOST}:${PORT}`)
});