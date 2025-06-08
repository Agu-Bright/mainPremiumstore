import mongoose from "mongoose";

const paymentModel = new mongoose.Schema({
  name: {
    type: String,
  },
  token: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "disabled"],
    default: "active",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Payment =
  mongoose.models.Payment || mongoose.model("Payment", paymentModel);

export default Payment;
