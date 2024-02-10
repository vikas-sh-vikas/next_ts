import { connect } from "@/dbConfig/dbConfig";
import Invoice from "@/models/invoice";
import { NextRequest, NextResponse } from "next/server";


connect();

export async function POST(request: NextRequest) {
  try {

    const reqBody = await request.json();
    const { _id,invoiceNo, date, shipTo, billTo, labourCharges, freight,gstType,igst,cgst,sgst,totalAmount,totalAmountGST} =
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
      const invoice = await Invoice.create({_id,invoiceNo, date, shipTo, billTo, labourCharges, freight,gstType,igst,cgst,sgst,totalAmount,totalAmountGST})
      console.log("Invoice Reach Add",invoice)
      

      // const invoice = await Invoice.create({})
      // console.log("Customer Reach Add",invoice)
      
      return NextResponse.json({
        message: "Invoice saved",
        success: true,
      });
    }
  } catch (error: any) {
    return NextResponse.json({ erroer: error.message }), { status: 500 };
  }
}
