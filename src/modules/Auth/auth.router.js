import { Router } from "express";
import { getAuthModule, signIn, signUp } from "./controller/auth.js";
import { asyncHandle } from "../../utils/ErrorHandle.js";
import validation from "../../middleware/validation.js";
import { signinSchema, signupSchema } from "./auth.validation.js";

const authRouter = Router()

authRouter.get('/' , getAuthModule)
authRouter.post('/signup' , validation(signupSchema) , asyncHandle(signUp))
authRouter.post('/signin' , validation(signinSchema), asyncHandle(signIn))

export default authRouter;