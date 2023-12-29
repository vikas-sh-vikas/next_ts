import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    console.log("UserData",reqBody)
    const user = await User.findOne({
      _id: reqBody.userId
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid user to set" }, { status: 400 });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(reqBody.password, salt);
    // console.log(user)
    user.password = hashPassword;
    await user.save();
    return NextResponse.json({message: "password reset success",
    success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

