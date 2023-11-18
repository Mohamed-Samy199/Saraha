import { Router } from "express";
import { deleteMessage, getMessageModule, sendMessage } from "./controller/message.js";
import { asyncHandle } from "../../utils/ErrorHandle.js";
import auth from "../../middleware/auth.middleware.js";
import validation from "../../middleware/validation.js";
import { messageDeleted, messageValidite } from "./message.validation.js";

const messageRouter = Router()

messageRouter.get('/' , auth , getMessageModule)
messageRouter.post('/:recevierId' , validation(messageValidite) , asyncHandle(sendMessage))
messageRouter.delete('/:id' , validation(messageDeleted) ,  auth , asyncHandle(deleteMessage))

export default messageRouter;