import Schedule from '../../model/admin/scheduleSchema.js';

// Create a new schedule
const createSchedule = async (req, res) => {
  const { doctorId, date, timeSlots, appointments } = req.body;

  try {
    const schedule = new Schedule({
      doctorId,
      date,
      timeSlots,
      appointments,
    });

    const savedSchedule = await schedule.save();
    res.status(201).json({ message: 'Schedule created successfully', data: savedSchedule });
  } catch (error) {
    res.status(500).json({ message: 'Error creating schedule', error: error.message });
  }
};

// Get all schedules
const getSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find().populate('doctorId', 'fullname email').populate('appointments');
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching schedules', error: error.message });
  }
};

// Update a schedule by ID
const updateSchedule = async (req, res) => {
  const { id } = req.params;
  const { doctorId, date, timeSlots, appointments } = req.body;

  try {
    const updatedSchedule = await Schedule.findByIdAndUpdate(
      id,
      { doctorId, date, timeSlots, appointments },
      { new: true, runValidators: true }
    );
    if (!updatedSchedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    res.status(200).json({ message: 'Schedule updated successfully', data: updatedSchedule });
  } catch (error) {
    res.status(500).json({ message: 'Error updating schedule', error: error.message });
  }
};

// Delete a schedule by ID
const deleteSchedule = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSchedule = await Schedule.findByIdAndDelete(id);
    if (!deletedSchedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    res.status(200).json({ message: 'Schedule deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting schedule', error: error.message });
  }
};

export default  {createSchedule, getSchedules, updateSchedule, deleteSchedule}

