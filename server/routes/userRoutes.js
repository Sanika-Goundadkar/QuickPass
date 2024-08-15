import express from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import Password from "../models/passwordsModel.js";
import SecurityQuestions from "../models/securityQuestionsModel.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  // const {name,email,password}=req.body;
  console.log("check1");
  console.log(req.body);
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send({
        message: "Email already registered",
        success: false,
        error: existingUser,
      });
    }
    // req.body.password = req.body.password;
    const user = new User(req.body);
    await user.save();

    // Generate tokens
    // const accessToken = user.generateAccessToken();
    // const refreshToken = user.generateRefreshToken();

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      }
    );

    console.log(accessToken);
    console.log(refreshToken);

    // Optionally, you might want to store the refresh token in a database or associated with the user

    return res.status(200).send({
      message: "User registered successfully",
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      accessToken,
      refreshToken,
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
  console.log("Request body:", req.body); // Add this line to log the request body

  const { email, masterPassword } = req.body;
  console.log("Login request received:", { email, masterPassword });

  try {
    const user = await User.findOne({ email });
    console.log("User found", user);

    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found, Register first" });
    }

    const isMatch = await user.comparePassword(masterPassword);
    console.log("isMatch is ", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Handle successful login

    // Generate tokens using the methods in the user model
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      }
    );

    // Optionally store the refresh token in the database
    user.refreshToken = refreshToken;
    await user.save();

    res.status(200).json({
      message: "Login successful",
      success: true,
      userId: user._id,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error in Login API" });
  }
});

router.patch("/updateuser/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    console.log("Update request data", updateData);

    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields
    if (updateData.password) {
      // Hash the password if it's being updated
      user.password = updateData.password;
    }
    if (updateData.name) {
      user.name = updateData.name;
    }
    if (updateData.email) {
      user.email = updateData.email;
    }

    // Save the document
    await user.save();
    res.status(200).json({ message: "User details updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating the user" });
  }
});

router.post("/update-password", async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify old password
    const isMatch = await user.comparePassword(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    // Hash new password and update it
    // const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating password" });
  }
});

router.post(
  "/change-master-password/:id",
  authenticateToken,
  async (req, res) => {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Verify old password
      const isMatch = await user.comparePassword(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Old password is incorrect" });
      }

      // Save new password
      user.password = newPassword;
      await user.save();
      res.json({
        message: "Master password updated successfully",
        success: true,
      });
    } catch (error) {
      res.json({
        message: "Error updating master password",
        success: false,
      });
      console.log("Error updating master password", error);
    }
  }
);

router.post("/reset-password", authenticateToken, async (req, res) => {
  const { newPassword } = req.body;
  const { userId } = req.user; // Extract userId from the token payload

  if (!newPassword) {
    return res.status(400).json({ message: "New password is required" });
  }

  try {
    // Hash the new password
    // const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Find the user and update the password
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: "Password reset successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Error resetting password" });
    console.log("Error in reset-password api", error);
  }
});

router.get("/user/:id", authenticateToken, async (req, res) => {
  // route to get user's details
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error in Get user api:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/deleteuser/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete all security questions associated with the user
    await SecurityQuestions.deleteMany({ belongsTo: id });

    // Delete all passwords associated with the user
    await Password.deleteMany({ createdBy: id });

    // Delete the user
    await User.findByIdAndDelete(id);

    res.status(200).json({
      message: "User and associated data deleted successfully",
      statusbar: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
