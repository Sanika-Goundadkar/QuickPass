import express from "express";
import crypto from "crypto";
import User from "../models/userModel.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { sendOtpToEmail } from "../utility/emailService.js";

const router = express.Router();

router.post("/send-otp", authenticateToken, async (req, res) => {
  const { email } = req.body;

  const otp = crypto.randomInt(100000, 999999).toString();

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.otp = otp;
    user.otpExpiresAt = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

    await user.save();

    // Send OTP to user's email (implement your email sending logic)
    await sendOtpToEmail(email, otp);

    res.json({ message: "OTP sent successfully", otp, success: true });
    console.log(otp);
  } catch (error) {
    res.status(500).json({ message: "Error generating OTP" });
  }
});

router.post("/verify-otp", authenticateToken, async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if OTP has expired
    if (Date.now() > user.otpExpiresAt) {
      user.otp = null;
      user.otpExpiresAt = null;
      await user.save();
      return res.status(400).json({ message: "OTP has expired" });
    }

    // Check if OTP matches
    if (user.otp === otp) {
      user.otp = null;
      user.otpExpiresAt = null;
      await user.save();
      return res.json({ success: true, message: "OTP verified successfully" });
    } else {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error verifying OTP" });
  }
});

//need to modify for reset password functionality
router.post("/resetpass-otp", authenticateToken, async (req, res) => {
  const { email } = req.body;

  const otp = crypto.randomInt(100000, 999999).toString();

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.otp = otp;
    user.otpExpiresAt = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

    await user.save();

    // Send OTP to user's email (implement your email sending logic)
    // sendOtpToEmail(email, otp);

    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error generating OTP" });
  }
});

export default router;
