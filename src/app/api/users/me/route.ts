import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/user.model"
import {NextRequest , NextResponse} from 'next/server';
import {getTokenData} from '@/helpers/getTokenData'

export async function POST(request:NextRequest){
    connectDB()
    try {
        const userId = await getTokenData(request)
        const user = await User.findById(userId).select("-password")
        if(!user){
            return NextResponse.json({
                message:"User not found",
            },{status:400})
        }

        return NextResponse.json({
            message:"User found",
            data:user
        })
    } catch (error) {
        return NextResponse.json({
            message:"Error getting user",
        },{status:400})
    }
}