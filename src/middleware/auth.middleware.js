import userModel from "../../DB/Models/User.model.js";
import { verifyToken } from "../utils/GenerateAndVerifytoken.js";

const auth = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization?.startsWith(process.env.BEARER_KEY)) {
            return res.json({ message: 'In-valid bearer key' })
        }
        const token = authorization.split(process.env.BEARER_KEY)[1]
        if (!token) {
            return res.json({ message: 'In-valid token' })
        }
        const decoded = verifyToken({ token })
        if (!decoded?.id) {
            return res.json({ message: 'In-valid token payload' })
        }
        const authUser = await userModel.findById(decoded.id).select('userName email status role')
        if (!authUser) {
            return res.json({ message: 'Not register account' })
        }
        req.user = authUser
        return next()
    } catch (error) {
        return res.json({message : "Catch Error" , error : error.message , stack : error.stack})
    }
}

export default auth;