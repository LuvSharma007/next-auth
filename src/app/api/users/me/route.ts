import {connect} from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import { NextRequest , NextResponse} from 'next/server'
connect()
import { getDataFromToken } from "@/helpers/getDataFromToken"


export async function POST(requests:NextRequest){
    // extract data from token
    const userId = await getDataFromToken(requests);
    const user = await User.findById({_id:userId}).select("-password")
    if(!user){
        return NextResponse.json({error:"Invalid Token"},{status:500})
    }
    return NextResponse.json({
        message:"User found",
        data:user
    })
}

