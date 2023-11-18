import connectDB from "../../DB/connection.js";
import { globleErrorHandle } from "../utils/ErrorHandle.js";
import authRouter from "./Auth/auth.router.js";
import messageRouter from "./Message/message.router.js";
import userRouter from "./User/user.router.js";

const initApp = (app , express) =>{
// convert buffer data
app.use(express.json({}))
// app router
app.get('/' ,(req , res) => res.send("Hello World"));

app.use("/auth" , authRouter)
app.use("/user" , userRouter)
app.use("/message" , messageRouter)

app.all("*" , (req , res, next) =>{
    return res.json({message : "In-valid Routing"})
})
// error handling middlware
app.use(globleErrorHandle)

// connection DB
connectDB()

}

export default initApp;