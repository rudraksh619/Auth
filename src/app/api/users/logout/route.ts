import { NextResponse } from "next/server";


export function GET()
{
    try {
        const response = NextResponse.json({message:"Logout sucesfully",
            status:"success"
        })
        response.cookies.set("token","",{
            httpOnly:true,
            expires: new Date(0)})
            return response;
    } catch (error) {
        return NextResponse.json({error : error},{status:500})
    }
}