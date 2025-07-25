import { NextRequest } from "next/server";
import jwt from "jsonwebtoken"

export const getDataFromToken = (request:NextRequest)=>{
    try {
        const token = request.cookies.get("token")?.value || "";
        const decodedToken:any =  jwt.verify(token,process.env.JWT_TOKEN_SECRET!)
        return decodedToken.userId
    } catch (error:any) {
        throw new Error(error.message)
    }
}