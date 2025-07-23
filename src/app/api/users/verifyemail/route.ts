import {connect} from "@/dbConfig/dbConfig"
import User from "@/models/userModel"

import { NextRequest , NextResponse} from 'next/server'

connect()

export async function POST(requests:NextRequest){
    try {
        const reqBody = await requests.json()
        const {token} = reqBody
        console.log(token);
        const user = await User.findOne({verifyToken:token,
            verifyTokenEXpiry:{$gt:Date.now()}
        })

        if(!user){
            return NextResponse.json({error:"Invalid Token"},{status:500})    
        }

        console.log(user);

        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenEXpiry = undefined
        await user.save();

        return NextResponse.json({
            message:"Email verified successfully",
            success:true,
        },{status:200})
        

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}



