import express from 'express';
import servicesController from '../../controller/admin/servicesController.js';

const router = express.Router();

// Route to handle requests for home page

router.post('/save-service', servicesController.createService);
router.get('/get-service', servicesController.getService);
router.put('/update-service/:id', servicesController.updateService);
router.delete('/delete-service/:id', servicesController.deleteService);

export default router;