import { getDataFromToken } from "@/helpers/getdataFromToken";
import { NextRequest,NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Supplier from '@/models/supplierModel';

connect();
export async function GET(request: NextRequest){
    try {
        const supplier = await Supplier.find()
        return NextResponse.json({
            message: "Supplier Found",
            data: supplier
        })
    } catch (error:any) {
        // console.log("reachGetData")
        return NextResponse.json({error : error.message},{status: 400})        
    }
}   