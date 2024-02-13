import { connect } from "@/dbConfig/dbConfig";
import InvoiceMaterial from "@/models/invoiceMaterialModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    // Ensure reqBody is an array
    if (!Array.isArray(reqBody)) {
      return NextResponse.json({
        error: "Invalid request format. Expected an array of objects.",
      }, { status: 400 });
    }
    // Iterate through each object in the array
    const results = [];
    for (const item of reqBody) {
      const { _id, invoiceId,description,qty,unit,unitPrice,discount,subTotal } = item;

      if (_id) {
        console.log("Reach Edit");
        console.log(_id);
        const invoiceMaterial = await InvoiceMaterial.findOneAndUpdate(
          { _id },
          { ...item },
          { new: true, upsert: true }
        );
        console.log("Supplier", invoiceMaterial);
        results.push({
          message: `Supplier with ID ${_id} updated`,
          success: true,
        });
      } else {
        console.log("ItemSave",item)
        // console.log("ReqBody",_id,supplierName, gstNo, address, contactPerson, contactDetail);
        const invoiceMaterial = await InvoiceMaterial.create(item);
        // console.log("Customer Reach Add",supplier);
        results.push({
          message: "Supplier saved",
          success: true,
        });
      }
    }

    return NextResponse.json(results);
  } 
  catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
