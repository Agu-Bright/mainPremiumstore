import mongoose from "mongoose";
const logModel = new mongoose.Schema({
  social: {
    type: String,
    required: [true, "name is required"],
  },
  image: {
    type: String,
  },
  logCount: {
    type: Number,
  },
  logs: [
    {
      log: {
        type: String,
      },
      available: {
        type: Boolean,
        default: true,
      },
    },
  ],
  age: {
    type: Number,
  },
  country: {
    type: String,
  },
  followers: {
    type: Number,
  },
  userName: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  stock: {
    type: Number,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Log = mongoose.models.Log || mongoose.model("Log", logModel);

export default Log;
