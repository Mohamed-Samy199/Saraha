import joi from "joi"

export const generalFields = {
    email : joi.string().email().required(),
    password : joi.string().required(),
    cpassword : joi.string().required(),
    id : joi.string().min(24).max(24).required()
}

const dataMethod = [ 'body' , 'query' , 'params']
const validation = (schema) => {
    return (req , res , next) =>{
        const validationArr = []
        dataMethod.forEach(key =>{
            if(schema[key]){
                const validationResult = schema[key].validate(req[key] , {abortEarly : false})
                if (validationResult.error) {
                    validationArr.push(validationResult.error.details)
                }
            }
        })
        if(validationArr.length > 0){
            return res.json({message : 'Validation error' , validationArr})
        }
        else {
            return next()
        }
    }
}

export default validation;