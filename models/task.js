import mongoose from "mongoose";

const taskModel = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  image: {
    type: String,
  },
  name: {
    type: String,
  },
  price: {
    type: String,
  },
  commision: {
    type: String,
  },
  rating: {
    type: String,
  },
  status: {
    type: String,
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Task = mongoose.models.Task || mongoose.model("Task", taskModel);

export default Task;
