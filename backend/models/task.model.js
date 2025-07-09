import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const Task = mongoose.model("Task", taskSchema);
export default Task;
