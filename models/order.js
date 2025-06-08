  import mongoose from "mongoose";

  const orderModel = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
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
  const Order = mongoose.models.Order || mongoose.model("Order", orderModel);

  export default Order;
