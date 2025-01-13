import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import UserManagementRoute from "./route/admin/UserManagementRoute.js";

// Load environment variables
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

// Middleware for parsing JSON
app.use(express.json());
app.use(cors());
// Simple route
app.get("/", (req, res) => {
  res.send("Test API Success");
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`API started & running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1);
  });

app.use("/api/v1/admin/user", UserManagementRoute);
