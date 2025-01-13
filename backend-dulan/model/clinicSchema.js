import mongoose from 'mongoose';

const ClinicSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    status:{
        type: String,
        required: true
    }
})

const Clinic = mongoose.model('Clinic', ClinicSchema);

export default Clinic;