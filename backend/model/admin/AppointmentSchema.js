import mongoose from 'mongoose';

const AppointmentSchema = mongoose.Schema({
    patientName: {
        type: String,
        required: true
    },
    patientEmail: {
        type: String,
        required: true
    },
    doctorName: {
        type: String,
        required: true
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    appointmentTime: {
        type: String,
        required: true
    },
    services: String,
    note: String
}) 


const Appointment = mongoose.model('Appointment', AppointmentSchema);

export default Appointment;