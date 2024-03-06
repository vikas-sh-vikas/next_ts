import { getDataFromToken } from "@/helpers/getdataFromToken";
import { NextRequest,NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Item from '@/models/itemsModel';

connect();
export async function GET(request: NextRequest){
    try {
        const item = await Item.find()
        console.log("Customers",item)
        return NextResponse.json({
            message: "Customer Found",
            data: item,
        })
    } catch (error:any) {
        // console.log("reachGetData")
        return NextResponse.json({error : error.message},{status: 400})        
    }
}   