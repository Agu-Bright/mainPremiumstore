import mongoose, { models } from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const user2Schema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "Account Name Already Exists"],
    required: [true, "Account Name is Required"],
  },
  email: {
    type: String,
    unique: [true, "Account Name Already Exists"],
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
  },
  role: {
    type: String,
    default: "user2",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});
//Encrypting password
user2Schema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});
user2Schema.pre("save", async function (next) {
  if (!this.isModified("withdrawalPassword")) {
    next();
  }
  this.withdrawalPassword = await bcrypt.hash(this.withdrawalPassword, 10);
});

//Generate password reset token
user2Schema.methods.getRessetPasswordToken = function () {
  //Gen token
  const resetToken = crypto.randomBytes(20).toString("hex");

  //hash and set to resetPassword Token
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //set token expire time
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

  return resetToken;
};

//because this route is called every time a user signIn we need to make this additional check
const User2 = mongoose.models.User2 || mongoose.model("User2", user2Schema);
export default User2;
