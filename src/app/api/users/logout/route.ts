import {connect} from "@/dbConfig/dbConfig"
import { NextRequest , NextResponse} from 'next/server'

connect()

export async function POST(requests:NextRequest){
    try {
        const response = NextResponse.json({
            message:"user logout successfully",
            success:true
        })

        response.cookies.set("token","",{
            httpOnly:true,
            expires:new Date(0)
        },)

        return response

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }    
}