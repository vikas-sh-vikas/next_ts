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
      const customer = await Customer.findOne({
        _id: reqBody._id
      });
      customer.customerName = reqBody.customerName,
      customer.gstNo = reqBody.gstNo,
      customer.address = reqBody.address,
      customer.contactPerson = reqBody.contactPerson,
      customer.contactDetail = reqBody.contactDetail,
      await customer.save();
      return NextResponse.json({
        message: "Customer Updated",
        success: true
      });
    }
    else {
      const newCustomer = new Customer({
        _id,customerName, gstNo, address, contactPerson, contactDetail
      });
      const saveCustomer = await newCustomer.save();
  
      return NextResponse.json({
        message: "Customer saved",
        success: true,
        saveCustomer,
      });
    }
  } catch (error: any) {
    return NextResponse.json({ erroer: error.message }), { status: 500 };
  }
}
