import express from 'express';
import UserManagementController from '../../controller/admin/UserManagementController.js';

const router = express.Router();

router.post('/save-user', UserManagementController.saveUser);
router.get('/get-user', UserManagementController.getUser);
router.post('/update-user/:id', UserManagementController.updateUser);
router.delete('/delete-user/:id', UserManagementController.deleteUser);

export default router;                                                                                      