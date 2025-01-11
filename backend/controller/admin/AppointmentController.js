import AppointmentSchema from "../../model/admin/AppointmentSchema.js";

const saveAppointment = async (req, res) => {
  const { name, email, phone, services, date, time, notes } = req.body;

  try {
    // Validate input
    if (!name || !email || !services || !date || !time) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    // Check if the appointment slot is already booked
    const existingAppointment = await AppointmentSchema.findOne({ date, time });
    if (existingAppointment) {
      return res.status(400).json({
        message: "Unavailable Appointment. This slot is already booked.",
      });
    }

    // Create and save the new appointment
    const appointment = new AppointmentSchema({
      name,
      email,
      phone,
      services,
      date,
      time,
      notes,
    });

    const savedAppointment = await appointment.save();
    res.status(201).json({
      message: "Appointment created successfully",
      data: savedAppointment,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while saving the appointment",
      error: error.message,
    });
  }
};

const getAppointment = async (req, res) => {
  try {
    const appointments = await AppointmentSchema.find(); // Add filters or pagination as needed
    res.status(200).json({
      message: "Appointments successfully loaded",
      data: appointments,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while loading appointments",
      error: error.message,
    });
  }
};

const updateAppointment = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, services, date, time, notes } = req.body;

  try {
    const updatedAppointment = await AppointmentSchema.findByIdAndUpdate(
      id,
      { name, email, phone, services, date, time, notes },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({
      message: "Appointment updated successfully",
      data: updatedAppointment,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while updating the appointment",
      error: error.message,
    });
  }
};

const deleteAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAppointment = await AppointmentSchema.findByIdAndDelete(id);

    if (!deletedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while deleting the appointment",
      error: error.message,
    });
  }
};

export default { saveAppointment, getAppointment, updateAppointment, deleteAppointment };
