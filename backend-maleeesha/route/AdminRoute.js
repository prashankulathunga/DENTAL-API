import express from 'express';
import AdminController from '../../controller/admin/AdminController.js';

const Router = express.Router();

Router.post('/signup', AdminController.signup);
Router.post('/login', AdminController.login);



export default Router;