import express from 'express';
import AppointmentController from '../../controller/admin/AppointmentController.js';

const router = express.Router();

router.post('/save-appointment', AppointmentController.saveAppointment);
router.get('/get-appointment', AppointmentController.getAppointment);
router.get('/update-appointment/:id', AppointmentController.updateAppointment);
router.delete('/delete-appointment/:id', AppointmentController.deleteAppointment);

export default router;