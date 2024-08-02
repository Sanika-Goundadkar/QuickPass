import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  belongsTo: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  type: {
    // 'login' or 'reset-password'
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

export default model("Otp", otpSchema);
