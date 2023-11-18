export const asyncHandle = (API) =>{
    return (req , res , next) =>{
        API(req , res , next).catch(error => {
            return next(new Error(error , {cause : 500}))
        })
    }
}

export const globleErrorHandle = (err , req , res , next)=>{
    if(err) {
        if(process.env.MOOD == 'DEV'){
            return res.status(err.cause || 500).json({message : err.message , err , stack : err.stack})
        }
        return res.status(err.cause || 500).json({message : err.message})
    }
}