import mongoose, { models } from "mongoose";

const scheduleSchema = new mongoose.Schema({
  monday: {
    type: [String],
    default: ["10:00", "11:00"],
  },
  tuesday: {
    type: [String],
    default: ["10:00", "11:00"],
  },
  wednesday: {
    type: [String],
    default: ["10:00", "11:00"],
  },
  thursday: {
    type: [String],
    default: ["10:00", "11:00"],
  },
  friday: {
    type: [String],
    default: ["10:00", "11:00"],
  },
  saturday: {
    type: [String],
    default: ["10:00", "11:00"],
  },
  sunday: {
    type: [String],
    default: ["10:00", "11:00"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

//because this route is called every time a user signIn we need to make this additional check
const Schema =
  mongoose.models.Schedule || mongoose.model("Schedule", scheduleSchema);
export default Schema;
