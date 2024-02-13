import { getDataFromToken } from "@/helpers/getdataFromToken";
import { NextRequest,NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Invoice from '@/models/invoiceModel';

connect();
export async function GET(request: NextRequest){
    try {
        const invoice = await Invoice.find()
        console.log("Customers",invoice)
        return NextResponse.json({
            message: "Customer Found",
            data: invoice
        })
    } catch (error:any) {
        // console.log("reachGetData")
        return NextResponse.json({error : error.message},{status: 400})        
    }
}   