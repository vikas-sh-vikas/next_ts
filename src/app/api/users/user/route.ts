import { getDataFromToken } from "@/helpers/getdataFromToken";
import { NextRequest,NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";


connect();
export async function GET(request: NextRequest){
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({_id:userId}).select("-password")
        return NextResponse.json({
            message: "User Found",
            data: user
        })
    } catch (error:any) {
        // console.log("reachGetData")
        return NextResponse.json({error : error.message},{status: 400})        
    }
}   