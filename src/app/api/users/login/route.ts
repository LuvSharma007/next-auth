import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/user.model"
import bcrypt from "bcryptjs";
import { error } from "console";
import {NextRequest , NextResponse} from 'next/server';
import jwt from "jsonwebtoken"


export async function POST(request:NextRequest){
    connectDB();
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody;

        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error:"User does not exist"},{status:400})
        }
        const PasswordMatched = await bcrypt.compare(password,user.password)
        if(!PasswordMatched){
            return NextResponse.json({error:"Check your credentials"},{status:400})    
        }

        const token = jwt.sign({
            _id:user._id,
            username:user.username,
            email:user.email,
        },
        process.env.JWT_TOKEN_SECRET!,
        {expiresIn:'7d'}
        )

        const response = NextResponse.json({
            message:"Logged in Successfully",
            success:true
        })

        response.cookies.set("token",token,{
            httpOnly:true
        });

        return response;

    } catch (error:any) {
        console.log("Error:",error);        
        return NextResponse.json({error:"Error login user"},{status:500})
    }
}