import express  from "express";
import initApp from "./src/modules/app.routes.js";
import * as dotenv from "dotenv";

dotenv.config()
const app = express()
const port =  3000; 

initApp(app , express)
app.listen(port , () => console.log(`server is running on port ${port}`))