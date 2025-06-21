import connect from '@/app/dbConfig/dbConfig'

import  User from '@/app/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

connect()


export async function POST(request:NextRequest){
    try {
        console.log("hye e");
        const req_body = await request.json();
        const {email,username,password} = req_body;
        console.log(req_body);
        console.log(email);
        // check if user is already  assigned 
        
        const temp_user = await  User.findOne({email});
        if(temp_user)
        {
            return NextResponse.json({error:"User alrady existed"},{status:400})
        }

        // hash the password 

        const salt = await bcrypt.genSalt(10);
        console.log(salt);
        const hashedPassword =await bcrypt.hash(password,salt);
        console.log("hashed Password is " , hashedPassword)

        const new_user = new User({
            username,
            email,
            password : hashedPassword
        })

       const saved_user = await new_user.save();
       console.log(saved_user);
       return NextResponse.json({
       message:"user saved succefully" , user : saved_user
       },{status:201})
 
    } catch (error:any) {
        console.log("Enter")
        return NextResponse.json({error:error.message},
        {status : 500});
    }
}