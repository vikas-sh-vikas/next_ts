import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';




connect()

export async function POST(request: NextRequest){
    try{
        const reqBody = await request.json()
        const {username,email,password} = reqBody

        console.log(reqBody)
        //user chack 
        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error:"User already exist"}, {status: 400})
        }

        //Hashed password
        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password,salt)

        //add user 
        const newUser = new User({
            username,
            email,
            password: hashPassword
        })

        const saveUser = await newUser.save();

        return NextResponse.json({message:"User saved",
                    success: true,
                    saveUser})


    }
    catch (error:any){
        return NextResponse.json({erroer: error.message}),
        {status: 500}
    }
}