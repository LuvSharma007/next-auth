import mongoose from "mongoose";

export async function connectDB(){
    try {
        mongoose.connect(`${process.env.MONGODB_URL}/${process.env.MONGODB_NAME}`)
        const connection = mongoose.connection

        connection.on('connected',()=>{
            console.log("Database is Connected");
        })

        connection.on('error',(err)=>{
        console.log("Database is Not Connected",err);
        process.exit()
        })
    } catch (error) {
        console.log("Error Connecting to Database",error);
    }
}