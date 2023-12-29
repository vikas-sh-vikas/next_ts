import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log(token);
    const user = await User.findOne({
      varifyToken: token,
      varifyTokenExpiry: { $gt: Date.now() }
    });
    if (!user) {
      return NextResponse.json({ error: "Invalid toke" }, { status: 400 });
    }
    console.log(user)
    user.isVarified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();
    return NextResponse.json({message: " Email Verify Success",
    success: true });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
