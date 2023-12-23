import mongoose from "mongoose";
const { MONGO_URI } = process.env; // destructure the process.env object

//validate MONGO_URI
if(!MONGO_URI){
    throw new Error("Please define the MONGO_URI environment variable inside .env.local");

}
export const connectDB = async () => {
    try {
         const {connection} = await mongoose.connect(MONGO_URI)
   if(connection.readyState === 1){
       console.log("MongoDB connected");
       return Promise.resolve(true); //resolve the promise
   }
    } catch (error) {
        console.log("MongoDB connection failed");
        return Promise.reject(false); //reject the promise
    }
  
};