import messageModel from "../../../../DB/Models/Message.model.js";
import userModel from "../../../../DB/Models/User.model.js";

export const getMessageModule = async (req , res , next) => {
    const messageList = await messageModel.find({recevierId : req.user._id})
    return res.json({message : "Done" , messageList})
}

export const sendMessage = async (req , res , next) =>{
    const {recevierId} = req.params;
    const {message} = req.body;

    const user = await userModel.findById(recevierId)
    if (!user) {
        return next(new Error('In-valid user id' , {cause : 404}))
    }
    const createMessage = await messageModel.create({message , recevierId : user._id})
    return res.status(201).json({message : "Done" , createMessage})
}

export const deleteMessage = async (req , res , next) =>{
    const { id } = req.params;
    const message = await messageModel.deleteOne({_id : id , recevierId : req.user._id})
    return message.deletedCount ? res.status(200).json({message : 'Done'}) : next(new Error('In-valid message id or owner' , {cause : 400}))
}