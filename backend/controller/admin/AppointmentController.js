import AppointmentSchema from "../../model/admin/AppointmentSchema.js";

const saveAppointment = async (req, res) => {
  const {
    patientName,
    patientEmail,
    doctorName,
    appointmentDate,
    appointmentTime,
    services,
    notes,
  } = req.body;

  try {
    // Check if the appointment slot is already booked
    const existingAppointment = await AppointmentSchema.findOne({
      appointmentDate,
      appointmentTime,
      doctorName,
    });
    if (existingAppointment) {
      return res
        .status(400)
        .json({
          message: "Unavailable Appointment. This slot is already booked.",
        });
    }

    // Create and save the new appointment
    const appointment = new AppointmentSchema({
      patientName,
      patientEmail,
      doctorName,
      appointmentDate,
      appointmentTime,
      services,
      notes,
    });

    const savedAppointment = await appointment.save();
    res
      .status(201)
      .json({
        message: "Appointment created successfully",
        data: savedAppointment,
      });
  } catch (error) {
    // Catch and handle errors
    res
      .status(500)
      .json({
        message: "An error occurred while saving the appointment",
        error: error.message,
      });
  }
};

const getAppointment = async (req, res) => {
  await AppointmentSchema.findOne().then((data) => {
    return res
      .status(200)
      .json({
        message: "Appointment successfully Loaded",
        data: data,
      })
      .catch((error) => {
        res.status(500).json({
          message: "An error occurred while loading appointment",
          error: error.message,
        });
      });
  });
};

const updateAppointment = async (req, res) => {
  const { id } = req.params;
  const {
    patientName,
    patientEmail,
    doctorName,
    appointmentDate,
    appointmentTime,
    services,
    notes,
  } = req.body;
  await AppointmentSchema.findByIdAndUpdate(
    id,
    {
      patientName,
      patientEmail,
      doctorName,
      appointmentDate,
      appointmentTime,
      services,
      notes,
    },
    { new: true }
  ).then((data) => {
    return res
      .status(200)
      .json({
        message: "Appointment updated successfully",
        data: data,
      })
      .catch((error) => {
        res.status(500).json({
          message: "An error occurred while updating appointment",
          error: error.message,
        });
      });
  });
};

const deleteAppointment = async (req, res) => {
    const { id } = req.params;
    await AppointmentSchema.findByIdAndDelete(id).then(() => {
      return res
       .status(200)
       .json({ message: "Appointment deleted successfully" });
    }).catch(err => {
        return res.status(500).json({ message: err.message });
    })
}



export default { saveAppointment, getAppointment, updateAppointment, deleteAppointment };
