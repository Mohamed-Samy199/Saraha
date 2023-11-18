import { Router } from "express";
import { createPosrt, getUserModule, profile, shareProfile, updatePassword } from "./controller/user.js";
import auth from "../../middleware/auth.middleware.js";
import { asyncHandle } from "../../utils/ErrorHandle.js";
import validation from "../../middleware/validation.js";
import { passwordValidate, profileValidate } from "./user.validation.js";
import { myMulter } from "../../utils/multer.js";

const userRouter = Router()

userRouter.get('/' , getUserModule)
userRouter.get('/profile' , auth , profile)
userRouter.patch('/password' , validation(passwordValidate) , auth , asyncHandle(updatePassword))
userRouter.get('/:id/profile' , validation(profileValidate) , asyncHandle(shareProfile))

userRouter.post('/' , myMulter({}).single('image') , createPosrt)

export default userRouter;