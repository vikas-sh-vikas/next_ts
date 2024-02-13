import { connect } from "@/dbConfig/dbConfig";
import Invoice from "@/models/invoiceModel";
import { NextRequest, NextResponse } from "next/server";

connect();  

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    console.log("Delete", reqBody.id);
    
    const invoice = await Invoice.findOneAndDelete({ _id: reqBody.id });
    
    console.log("Delete", invoice);
    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 400 });
    }
    // const customer = await Customer.create({  reqBody})
    // console.log("Customer Reach Add",customer)

    return NextResponse.json({
      message: "Data Deleted",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ erroer: error.message }), { status: 500 };
  }
}
