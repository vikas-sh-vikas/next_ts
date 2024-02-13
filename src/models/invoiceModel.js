import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
    invoiceNo:{
        type: Number,
        // required: [true,"Please provide a Invoice No."],
        // unique: true,
    },
    date:{
        type: String,
        // required: [true,"Please provide a Date"],
        // unique: true,
    },
    labourCharge:{
        type: Number,
        // required: [true,"Please provide a Labour Charge"],
    },
    freight:{
        type: Number,
        // required: [true,"Please provide a Freight"],
    },
    totalAmount:{
        type: Number,
        // required: [true,"Please provide a Total Amount"],
    },
    totalAmountGst:{
        type: Number,
        // required: [true,"Please provide a Total GST"],
    },
    gstType:{
        type: Number,
        // required: [true,"Please provide a GST Type"],
    },
    igst:{
        type: Number,
        // required: [true,"Please provide a IGST"],
    },
    cgst:{
        type: Number,
        // required: [true,"Please provide a CGST"],
    },
    sgst:{
        type: Number,
        // required: [true,"Please provide a SGST"],
    },
    shipTo:{
        type: String,
        // required: [true,"Please provide a Ship to"],
    },
    shipToName:{
        type: String,
        // required: [true,"Please provide a Ship to Name"],
    },
    billTo:{
        type: String,
        // required: [true,"Please provide a Bill to"],
    },
    billToName:{
        type: String,
        // required: [true,"Please provide a Bill to Name"],
    },

})
// console.log("Schema",invoiceSchema)
const Invoice = mongoose.models.invoices || mongoose.model("invoices",invoiceSchema);
console.log("InvoicesModel",Invoice)

export default Invoice;