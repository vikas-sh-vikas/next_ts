import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
    supplierName:{
        type: String,
        required: [true,"Please provide a customerName"],
        // unique: true,
    },
    gstNo:{
        type: String,
        required: [true,"Please provide a gstNo"],
        // unique: true,
    },
    address:{
        type: String,
        required: [true,"Please provide a address"],
    },
    contactPerson:{
        type: String,
        required: [true,"Please provide a contactPerson"],
    },
    contactDetail:{
        type: String,
        required: [true,"Please provide a contactDetail"],
    },
    
})
const Supplier = mongoose.models.suppliers || mongoose.model("suppliers",supplierSchema);

export default Supplier;