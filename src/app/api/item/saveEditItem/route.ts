import { connect } from "@/dbConfig/dbConfig";
import Item from "@/models/itemsModel";
import { NextRequest, NextResponse } from "next/server";


connect();


export async function POST(request: NextRequest) {
  try {
    
    const reqBody = await request.json();
    const { _id,itemName, unit, description, hsnCode, price} = reqBody;
    //add customer
    if(reqBody._id){
      console.log(reqBody._id)
      const item = await Item.findOneAndUpdate({
        _id: reqBody._id
      },{
        ...reqBody
    });

      // console.log("Customer",item)

      return NextResponse.json({
        message: "Customer Updated",
        success: true
      });
    }
    else {
      console.log("Reach Save API",reqBody)
      const item = await Item.create({ itemName, unit, description, hsnCode, price})
      console.log("Customer Reach Add",item)
      
      return NextResponse.json({
        message: "Customer saved",
        success: true,
      });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
