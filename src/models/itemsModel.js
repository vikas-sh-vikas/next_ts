import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    itemName:{
        type: String,
        required: [true,"Please provide a Item Name Name"],
    },
    unit:{
        type: String,
        required: [true,"Please provide a Unit name"],
    },
    description:{
        type: String,
        required: [true,"Please provide a Description name"],
    },
    hsnCode:{
        type: String,
        required: [true,"Please provide a HSN Code name"],
    },
    price:{
        type: String,
        required: [true,"Please provide a Price name"],
    },
    
})
const Item = mongoose.models.items || mongoose.model("items",itemSchema);

export default Item;
