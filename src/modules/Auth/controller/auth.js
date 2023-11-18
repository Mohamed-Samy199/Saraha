import userModel from "../../../../DB/Models/User.model.js";
import { generateToken } from "../../../utils/GenerateAndVerifytoken.js";
import { compare, hash } from "../../../utils/HashAndCompare.js";

export const getAuthModule = (req, res, next) => {
    return res.json({ message: "Auth Module" })
}

export const signUp = async (req, res, next) => {
        const { userName, email, password } = req.body;
        const userExist = await userModel.findOne({ email })
        if (userExist) {
            return next(new Error('User Exist' , {cause : 409}))
        }
        const hashPassword = hash({ plaintext: password })
        const user = await userModel.create({ userName, email, password: hashPassword })
        return res.status(201).json({ message: "Done", user: user._id })
}

export const signIn = async (req , res , next) =>{
        const { email , password } = req.body;
        const user = await userModel.findOne({email})
        if(!user){
            return next(new Error('User Not Exist' , {cause : 404}))
        }
        const match = compare({plaintext : password , hashValue : user.password})
        if(!match){
            return next(new Error('In-valid Password' , {cause : 404}))
        }
        const token = generateToken({payload : {id : user._id , isLoggedIn : true , role : user.role}})

        user.status = "online";
        await user.save()

        return res.status(200).json({ message: "Done" , token })
}