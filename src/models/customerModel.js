import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    customerName:{
        type: String,
        required: [true,"Please provide a customerName"],
        unique: true,
    },
    gstNo:{
        type: String,
        required: [true,"Please provide a gstNo"],
        unique: true,
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
const Customer = mongoose.models.customers || mongoose.model("customers",customerSchema);

export default Customer;