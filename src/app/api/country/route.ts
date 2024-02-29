import { getDataFromToken } from "@/helpers/getdataFromToken";
import { NextRequest,NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Country from '@/models/countriesModel';

connect();
export async function GET(request: NextRequest){
    try {
        const country = await Country.find()
        return NextResponse.json({
            message: "Customer Found",
            data: country
        })
    } catch (error:any) {
        // console.log("reachGetData")
        return NextResponse.json({error : error.message},{status: 400})        
    }
}   