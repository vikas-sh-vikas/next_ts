import { connect } from "@/dbConfig/dbConfig";
import Supplier from "@/models/supplierModel";
import { NextRequest, NextResponse } from "next/server";


connect();

export async function POST(request: NextRequest) {
  try {

    const reqBody = await request.json();
    const { _id,supplierName, gstNo, address, contactPerson, contactDetail } =
      reqBody;
    //add customer
    if(reqBody._id){
      console.log("Reach Edit")
      console.log(reqBody._id)
      const supplier = await Supplier.findOneAndUpdate({
        _id: reqBody._id
      },{
        ...reqBody
    });

      console.log("Customer",supplier)

      return NextResponse.json({
        message: "Supplier Updated",
        success: true
      });
    }
    else {
      
      const supplier = await Supplier.create({  _id,supplierName, gstNo, address, contactPerson, contactDetail})
      console.log("Customer Reach Add",supplier)
      
      return NextResponse.json({
        message: "Supplier saved",
        success: true,
      });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
