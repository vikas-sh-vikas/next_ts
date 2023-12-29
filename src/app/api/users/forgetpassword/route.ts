import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const user = await User.findOne({email:reqBody.email}).select("_id")
    if(!user){
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }
    return NextResponse.json({message: "Email Match",
    data: user,
    success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

