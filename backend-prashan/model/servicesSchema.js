import mongoose from "mongoose";

const ServicesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

const Services = mongoose.model('Services', ServicesSchema);

export default Services;