import express from 'express';
import clinicController from '../../controller/admin/clinicController.js';

const router = express.Router();

// Route to handle requests for home page
router.post('/save-clinic', clinicController.createClinic);
router.get('/get-clinic', clinicController.getClinic);
router.put('/update-clinic/:id', clinicController.updateClinic);
router.delete('/delete-clinic/:id', clinicController.deleteClinic);

export default router;