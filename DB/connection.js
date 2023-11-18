import mongoose from "mongoose";

const connectDB = async () =>{
    return await mongoose.connect(process.env.DB_LOCAL)
    .then(result => {console.log(`DB Connection Successful...`)})
    .catch(err => {console.log(`DB connection Fail ${err}`)})
}
export default connectDB;