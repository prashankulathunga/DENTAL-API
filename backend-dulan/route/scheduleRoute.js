import express from 'express';
import scheduleController from '../../controller/admin//scheduleController.js';

const router = express.Router();


router.post('/create-schedule', scheduleController.createSchedule);
router.get('/get-schedule', scheduleController.getSchedules);
router.put('/update-schedule/:id',scheduleController.updateSchedule);
router.delete('/delete-schedule/:id', scheduleController.deleteSchedule);


export default router;
