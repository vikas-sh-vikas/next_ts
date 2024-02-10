import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
    invoiceNo:{
        type: Number,
        required: [true,"Please provide a Invoice No."],
        // unique: true,
    },
    date:{
        type: String,
        required: [true,"Please provide a Date"],
        // unique: true,
    },
    shipTo:{
        type: String,
        required: [true,"Please provide a Ship to"],
    },
    billTo:{
        type: String,
        required: [true,"Please provide a Bill to"],
    },
    labourCharges:{
        type: Number,
        required: [true,"Please provide a Labour Charge"],
    },
    freight:{
        type: Number,
        required: [true,"Please provide a Freight"],
    },
    gstType:{
        type: Number,
        required: [true,"Please provide a GST Type"],
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
    totalAmount:{
        type: Number,
        required: [true,"Please provide a Total Amount"],
    },
    totalAmountGST:{
        type: Number,
        required: [true,"Please provide a Total GST"],
    },
    
})
const Customer = mongoose.models.customers || mongoose.model("customers",invoiceSchema);

export default Customer;