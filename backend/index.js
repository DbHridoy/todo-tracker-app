import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "./routes/Task.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/tasks", taskRoutes);

mongoose
  .connect(`${process.env.MONGO_URI}/todo`)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
    console.log(process.env.MONGO_URI);
  });
app.get("/", (req, res) => {
  res.send("Welcome to the Todo Tracker API");
});
