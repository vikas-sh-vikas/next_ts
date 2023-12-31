import { connect } from "@/dbConfig/dbConfig";
import Customer from "@/models/customerModel";
import { NextRequest, NextResponse } from "next/server";


connect();

export async function POST(request: NextRequest) {
  try {

    const reqBody = await request.json();
    const { _id,customerName, gstNo, address, contactPerson, contactDetail } =
      reqBody;
    //add customer
    if(reqBody._id){
      console.log("Reach Edit")
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
      
      const customer = await Customer.create({  _id,customerName, gstNo, address, contactPerson, contactDetail})
      console.log("Customer Reach Add",customer)
      
      return NextResponse.json({
        message: "Customer saved",
        success: true,
      });
    }
  } catch (error: any) {
    return NextResponse.json({ erroer: error.message }), { status: 500 };
  }
}
