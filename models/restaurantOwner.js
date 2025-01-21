import mongoose, { models } from "mongoose";

const restaurantOwner = new mongoose.Schema({
  email: {
    type: String,
    unique: [true, "email Already Exists"],
    required: [true, "Email is required"],
  },
  firstName: {
    type: String,
    required: [true, "First name required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
  restaurantPhoneNumber: {
    type: String,
    required: [true, "Restaurant phone number is required"],
  },
  restaurantCity: {
    type: String,
    required: [true, "Restaurant city is required"],
  },
  restaurantStateProvince: {
    type: String,
    required: [true, "Restaurant state or province is required"],
  },
  restaurantCountry: {
    type: String,
    required: [true, "Restaurant country is required"],
  },
  servicePlan: {
    type: String,
    required: [true, "Do choose a service plan"],
    enum: {
      values: ["basic", "core", "pro"],
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  isRestaurant: {
    type: Boolean,
    default: false,
  },
  subScriptionStart: {
    type: Date,
  },
  subscriptionEnd: {
    type: Date,
  },
  isSubscribed: {
    type: Boolean,
    detault: false,
  },
  expiryDate: {
    type: Date,
  },
  restaurantName: {
    type: String,
  },
  autoRenewal: {
    type: Boolean,
    detault: false,
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

const RestaurantOwner =
  mongoose.models.RestaurantOwner ||
  mongoose.model("RestaurantOwner", restaurantOwner);
export default RestaurantOwner;
