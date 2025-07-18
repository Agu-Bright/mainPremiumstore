import mongoose from "mongoose";

const order2Model = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User2",
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
  social: {
    type: String,
  },
  image: { type: String },
  description: {
    type: String,
  },
  orderLog: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Log",
  },
  status: String,
  transactionId: String,
  tx_ref: String,
  amount: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Order2 = mongoose.models.Order2 || mongoose.model("Order2", order2Model);

export default Order2;
