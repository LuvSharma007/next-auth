import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/user.model"
import { error } from "console";
import {NextRequest , NextResponse} from 'next/server'
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";


export async function POST(request:NextRequest){
    connectDB();
    try {
        const reqBody = await request.json()
        const {username , email , password} = reqBody;

        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error:"User already exists"},{status:400})
        }

        const hashPassword = await bcrypt.hash(password,10)
        
        const userCreated = await User.create({
            username,
            email,
            password:hashPassword
        })

        if(!userCreated){
            return NextResponse.json({error:"Error Registering User"},{status:400})
        }

        // send verification email

        const emailRes = await sendEmail({email,emailType:"VERIFY",userId:userCreated._id})
        console.log(emailRes);
        

        return NextResponse.json({
            message:"User registered and email send successfully",
            success:true,
        },{status:200})








    } catch (error:any) {
        return NextResponse.json({error : error.message},{status:500})        
    }
}

