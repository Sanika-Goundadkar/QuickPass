import express from "express";
import userModel from "../models/userModel.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  // const {name,email,password}=req.body;
  console.log("check1");
  console.log(req.body);
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send({
        message: "User already exists",
        success: false,
        error: existingUser,
      });
    }
    // req.body.password = req.body.password;
    const user = new userModel(req.body);
    await user.save();
    return res.status(200).send({
      message: "User registered successfully",
      success: true,
      user: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in register API",
      success: false,
      error: error,
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, masterPassword } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(masterPassword);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Handle successful login (e.g., proceed to TOTP authentication)
    res.status(200).json({ message: "Login successful", userId: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
