import { connect } from "@/dbConfig/dbConfig";
import Invoice from "@/models/invoiceModel";
import { NextRequest, NextResponse } from "next/server";


connect();

export async function POST(request: NextRequest) {
  try {

    const reqBody = await request.json();
    const { _id,invoiceNo, date, labourCharge, freight, totalAmount,totalAmountGst, gstType,igst,cgst,sgst,shipTo,shipToName,billTo,billToName} =
      reqBody;
    //add customer
    if(reqBody._id){
      console.log("Reach Edit")
      console.log(reqBody._id)
      const invoice = await Invoice.findOneAndUpdate({
        _id: reqBody._id
      },{
        ...reqBody
    });
      console.log("Invoice",invoice)

      return NextResponse.json({
        message: "Invoice Updated",
        success: true
      });
    }
    else {
      console.log("Reach Add")

      const invoice = await Invoice.create({_id,invoiceNo, date, labourCharge, freight, totalAmount,totalAmountGst, gstType,igst,cgst,sgst,shipTo,shipToName,billTo,billToName})
      console.log("Invoice Reach Add",invoice)
      

      return NextResponse.json({
        message: "Invoice saved",
        id: invoice._id,
        success: true,
      });
    }
  }
  catch (error: any) {
    console.log("Reach Error")
    return NextResponse.json({ error: error.message }, { status: 500 });
}
}
