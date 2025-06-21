import { NextRequest } from "next/server";
import jwt from "jsonwebtoken"
export function getdata(request:NextRequest)
{
    try {
        const token = request.cookies.get('token')?.value || '';
    const user:any  = jwt.verify(token,process.env.Token_SECRET!)

    const user_id =  user._id;
    return user_id;

    } catch (error:any) {
        throw new Error(error.message);
    }
}