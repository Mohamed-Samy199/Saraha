import mongoose from "mongoose";
import { Schema, Types, model } from "mongoose";

const messageSchema = new Schema({
    message : {
        type : String,
        require : true
    },
    recevierId : {
        type : Types.ObjectId,
        ref : 'User',
        require : true
    }
},{
    timestamps : true
})

const messageModel = mongoose.models.Message || model('Message' , messageSchema);

export default messageModel;