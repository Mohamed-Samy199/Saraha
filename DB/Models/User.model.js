import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
    fristName : String,
    lastName : String,
    userName : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true,
        unique : true
    },
    password : {
        type : String,
        require : true
    },
    age : Number,
    phone : String,
    address : String,
    profilePic : String,
    coverPic : String,
    gender : {
        type : String,
        default : 'male',
        enum : ['male' , 'female']
    },
    isConfirmed : {
        type : Boolean,
        default : false
    },
    status : {
        type : String,
        default : 'offline',
        enum : ['online' , 'offline' , 'blocked']
    },
    role : {
        type : String,
        default : 'User',
        enum : ['User' , 'Admin']
    },
    Image : {
        path : {
            type : String,
            required : true
        },
        public_id : {
            type : String,
            required : true
        }
    }
},{
    timestamps : true
})

const userModel = mongoose.models.User || model('User' , userSchema)

export default userModel;