import {connect} from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import bcrypt from "bcryptjs"
import { NextRequest , NextResponse} from 'next/server'
import { sendEmail } from "@/helpers/mailer"
connect()

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const {username,email, password} = reqBody
        // validation
        console.log(reqBody);
        
        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error:"User Already exists"},{status:400})
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)

        const createdUser = await new User({
            username,
            email,
            password:hashPassword,
        })

        const savedUser = await createdUser.save()
        console.log(savedUser);
        
        // send verificatoin email

        await sendEmail({email,emailType:"VERIFY",userId:createdUser._id})
        console.log("email sent successfully to mail trap");
        

        return NextResponse.json({
            message:"User registered successfully",
            success:true,
            createdUser
        },{status:200})

    } catch (error:any) {
        return NextResponse.json({error:error.message},
            {status:500}
        )
    }
}