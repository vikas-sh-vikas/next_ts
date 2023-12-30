import { getDataFromToken } from "@/helpers/getdataFromToken";
import { NextRequest,NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Customer from "@/models/customerModel";


connect();
export async function POST(request: NextRequest){
    try {
        
        const reqBody = await request.json();
        console.log("object",reqBody)
        const customer = await Customer.findOne({_id:reqBody.id})

        if(!customer){
            return NextResponse.json({
                message: "Customer Not Found",
                data: customer
            })
        }
        return NextResponse.json({
            message: "Customer Found",
            data: customer
        })
    } catch (error:any) {
        // console.log("reachGetData")
        return NextResponse.json({error : error.message},{status: 400})        
    }
}   