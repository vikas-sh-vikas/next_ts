import mongoose from "mongoose";

const countrySchema = new mongoose.Schema({
    country_code:{
        type: String,
        required: [true,"Please provide a Country Name"],
        // unique: true,
    },
    country_name:{
        type: String,
        required: [true,"Please provide a country name"],
        // unique: true,
    },
    
})
const Country = mongoose.models.countries || mongoose.model("countries",countrySchema);

export default Country;