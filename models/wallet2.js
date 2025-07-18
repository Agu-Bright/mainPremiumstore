import mongoose from "mongoose";

const wallet2Model = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User2",
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
const Wallet2 =
  mongoose.models.Wallet2 || mongoose.model("Wallet2", wallet2Model);

export default Wallet2;
