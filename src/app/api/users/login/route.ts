import connect from "@/app/dbConfig/dbConfig";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/userModel";
import jwt from "jsonwebtoken";
connect();


 export async function POST(request:NextRequest){
   try {
     const req_body = await  request.json();
    const {email,password} = req_body;
    
    const user = await  User.findOne({email})
    if(!user)
    {
       return  NextResponse.json({error:"Plz enter valid email"})
    }
    const validPassword = bcrypt.compare(password,user.password);
    if(!validPassword){
        return NextResponse.json({error:"wrong Password"},{status:400})
    }
    const token_data = {
        _id:user._id,
        username : user.username,
        email : user.email,
    }
    const token =  jwt.sign(token_data, process.env.Token_SECRET!, { expiresIn: "1d" })
    const response = NextResponse.json({
        message:"Login Sucessfull",
        success:true,
    })
    response.cookies.set("token" , token ,{httpOnly:true})
    return response;
   } catch (error) {
    return NextResponse.json({error},{status:500});
   }
}