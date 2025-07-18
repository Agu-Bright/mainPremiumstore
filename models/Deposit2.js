import mongoose from "mongoose";

const depositModel = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User2",
  },
  wallet: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Wallet2",
  },
  transactionRef: { type: String, unique: true },
  screenShot: {
    type: String,
  },
  method: {
    type: String,
  },
  amount: {
    type: String,
  },
  network: {
    type: String,
  },
  usdt: {
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
const Deposit2 =
  mongoose.models.Deposit2 || mongoose.model("Deposit2", depositModel);

export default Deposit2;
