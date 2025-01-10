import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import AdminRoute from './route/admin/AdminRoute.js';
import UserManagementRoute from './route/admin/UserManagementRoute.js';
import AppointmentRoute from './route/admin/AppointmentRoute.js';
import ScheduleRoute from './route/admin/scheduleRoute.js';
import ClinicRoute from './route/admin/clinicRoute.js';

// Load environment variables
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Simple route
app.get('/', (req, res) => {
  res.send('Test API Success');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`API started & running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1);
  });


  app.use('/api/v1/admin/start', AdminRoute);
  app.use('/api/v1/admin/user', UserManagementRoute);
  app.use('/api/v1/admin/appointment', AppointmentRoute);
  app.use('/api/v1/admin/schedule', ScheduleRoute);
  app.use('/api/v1/admin/clinic', ClinicRoute);