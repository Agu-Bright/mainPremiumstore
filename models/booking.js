import mongoose, { models } from "mongoose";

const ReservationSchema = new mongoose.Schema({
    reservationDate: {
      type: Date,
      required: true,
    },
    reservationTime: {
      type: String,
      required: true,
    },
  numberOfGuests: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  specialRequests: {
    type: String,
  },
  resOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cancellationPolicyAcknowledged: {
    type: Boolean,
    default: false,
  },
  token: {
    type: String,
  },
});

const Reservation =
  mongoose.models.Reservation ||
  mongoose.model("Reservation", ReservationSchema);

export default Reservation;
