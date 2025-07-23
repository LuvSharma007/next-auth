import { error } from "console";
import mongoose from "mongoose";

export async function connect() {
    try {
        if(process.env.MONGO_URI){
            mongoose.connect(`${process.env.MONGO_URI}/${process.env.MONGO_DB_NAME}`)
        }else{
            console.log('Failed to access database URL');
        }
        const connection = mongoose.connection
        connection.on('connected',()=>{
            console.log('MongoDB is connected ');
        })
        connection.on('error',()=>{
            console.log('MongoDb connection error,please make sure db is up and running'+error);
            process.exit();
        })
    } catch (error) {
        console.log('Something went wrong',error);
        
    }
}