import { connect } from "@/dbConfig/dbConfig";
import Customer from "@/models/customerModel";
import { NextRequest, NextResponse } from "next/server";


connect();

export async function POST(request: NextRequest) {
  try {
    console.log("Reach Save API")

    const reqBody = await request.json();
    const { _id,customerName, gstNo, partyType, country, state,district,street,pincode,contactPerson,contactDetail} =
      reqBody;
    //add customer
    if(reqBody._id){
      console.log(reqBody._id)
      const customer = await Customer.findOneAndUpdate({
        _id: reqBody._id
      },{
        ...reqBody
    });

      console.log("Customer",customer)

      return NextResponse.json({
        message: "Customer Updated",
        success: true
      });
    }
    else {
      
      const customer = await Customer.create({  _id,customerName, gstNo, partyType, country, state,district,street,pincode,contactPerson,contactDetail})
      console.log("Customer Reach Add",customer)
      
      return NextResponse.json({
        message: "Customer saved",
        success: true,
      });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
