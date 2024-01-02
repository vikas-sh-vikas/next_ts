import { connect } from "@/dbConfig/dbConfig";
import Customer from "@/models/customerModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    console.log("Delete", reqBody);
    const customer = await Customer.findOneAndDelete({ _id: reqBody.id });

    if (!customer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 400 });
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
