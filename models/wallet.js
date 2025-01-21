import mongoose from "mongoose";

const walletModel = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  walletAddress: {
    type: String,
  },
  network: {
    type: String,
  },
  balance: {
    type: Number,
    default: 0,
  },
  reqUpdate: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "user",
  },
  profit: {
    type: Number,
    default: 0,
  },
  totalBal: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Wallet = mongoose.models.Wallet || mongoose.model("Wallet", walletModel);

export default Wallet;
