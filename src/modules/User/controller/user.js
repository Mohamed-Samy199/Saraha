import userModel from "../../../../DB/Models/User.model.js"
import { compare, hash } from "../../../utils/HashAndCompare.js"
import cloudinary from "../../../utils/cloudinary.js"

export const getUserModule = (req , res , next) => {
    return res.json({message : "User Medule"})
}

export const profile = async (req , res , next) =>{
    const user = await userModel.findById(req.user._id)
    return res.json({message : "Done" , user})
}

export const updatePassword = async (req , res , next) =>{
    const { oldPassword , newPassword } = req.body;

    const user = await userModel.findById(req.user._id)
    const match = compare({plaintext : oldPassword , hashValue : user.password})
    if (!match) {
        return next(new Error("In-valid old Password" , {cause : 400}))
    }
    const hashPassword = hash({plaintext : newPassword})
    user.password = hashPassword
    await user.save()
    return res.status(200).json({message : "Done"})
}
export const shareProfile = async (req , res , next) => {
    const user = await userModel.findById(req.params.id).select("userName email fristName lastName profilePic")
    return user ? res.status(200).json({message : "Done" , user}) : next(new Error('In-valid account id' , {cause : 404}))
}

export const createPosrt = async(req , res , next) =>{
    try {
        console.log("goooooooo");
        const {secure_url , public_id} = await cloudinary.uploader.upload(req.file.path , {folder : 'post'});
        const post = await userModel.create({ Image : {
            path : secure_url,
            public_id,
        }});
        if(!post){
            await cloudinary.uploader.destroy(public_id);
            return res.status(400).json({message : 'fail to add post, please try again later'});
        }
        return res.status(201).json({message : 'Done' , post})
        
    } catch (error) {
        res.status(400).json({message : "fail" , stack : error.stack})
    }
}