import mongoose from "mongoose";

const AppointmentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  services: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "services", // Reference to the Doctor model
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  notes: String,
});

const Appointment = mongoose.model("Appointment", AppointmentSchema);

export default Appointment;
