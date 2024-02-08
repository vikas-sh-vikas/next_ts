import { getDataFromToken } from "@/helpers/getdataFromToken";
import { NextRequest,NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Customer from '@/models/customerModel';

connect();
export async function GET(request: NextRequest){
    try {
        const customer = await Customer.find()
        console.log("Customers",customer)
        return NextResponse.json({
            message: "Customer Found",
            data: customer
        })
    } catch (error:any) {
        // console.log("reachGetData")
        return NextResponse.json({error : error.message},{status: 400})        
    }
}   