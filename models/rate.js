import mongoose from "mongoose";

const rateModel = new mongoose.Schema({
  rate: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Rate = mongoose.models.Rate || mongoose.model("Rate", rateModel);

export default Rate;
