import {connect} from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import bcrypt from "bcryptjs"
import { NextRequest , NextResponse} from 'next/server'
import jwt from "jsonwebtoken"

connect()

export async function POST(requests:NextRequest){
    try {
        const reqBody = await requests.json();
        const {email ,password } = reqBody;
        console.log(reqBody);

        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error:"User does not exists"},{status:400})
        }

        const isPasswordCorrect = await bcrypt.compare(password,user.password)

        if(!isPasswordCorrect){
            return NextResponse.json({error:"email or password is incorrect"},{status:400})
        }

        const token = jwt.sign({
            email:email,
            username:user.username,
            userId:user._id
        },
        process.env.JWT_TOKEN_SECRET!,
        { expiresIn: '1h' }
        )
                
        const response = NextResponse.json({
            message:"user logged in Successfully",
            success:true,
        })

        response.cookies.set("token",token,{
            httpOnly:true
        })

        return response;        

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }    
}