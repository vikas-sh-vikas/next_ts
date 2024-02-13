import mongoose from "mongoose";

const invoiceMaterialSchema = new mongoose.Schema({

    invoiceId:{
        type: String,
        // required: [true,"Please provide a Invoice No."],
        // unique: true,
    },
    description:{
        type: String,
        // required: [true,"Please provide a Invoice No."],
        // unique: true,
    },
    qty:{
        type: Number,
        // required: [true,"Please provide a Date"],
        // unique: true,
    },
    unit:{
        type: String,
        // required: [true,"Please provide a Labour Charge"],
    },
    unitPrice:{
        type: Number,
        // required: [true,"Please provide a Freight"],
    },
    discount:{
        type: Number,
        // required: [true,"Please provide a Total Amount"],
    },
    subTotal:{
        type: Number,
        // required: [true,"Please provide a Total GST"],
    }
})
// console.log("Schema",invoiceSchema)
const InvoiceMaterial = mongoose.models.invoiceMaterials || mongoose.model("invoiceMaterials",invoiceMaterialSchema);
// console.log("InvoicesModel",Invoice)

export default InvoiceMaterial;