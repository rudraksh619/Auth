import { getdata } from "@/helpers/getdata";
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/userModel";
import connect from "@/app/dbConfig/dbConfig";


connect()

export async function GET(request:NextRequest){
    try {
        const user_id = await getdata(request);
        const user = await User.findOne({_id:  user_id}).select("-password");
        return NextResponse.json({
            message: "User found Succesfully",
            data:user,
        })
    } catch (error:any) {
        return NextResponse.json({error : error.message},{
            status:400
        })
    }
}

