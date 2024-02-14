import mongoose from "mongoose";

const invoiceMaterialSchema = new mongoose.Schema({

    invoiceId:{
        type: String,
    },
    description:{
        type: String,
    },
    qty:{
        type: Number,
    },
    unit:{
        type: String,
    },
    unitPrice:{
        type: Number,
    },
    discount:{
        type: Number,
    },
    subTotal:{
        type: Number,
    }
})
const InvoiceMaterial = mongoose.models.invoiceMaterials || mongoose.model("invoiceMaterials",invoiceMaterialSchema);

export default InvoiceMaterial;