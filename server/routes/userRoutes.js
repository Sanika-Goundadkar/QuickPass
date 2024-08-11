import express from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import Password from "../models/passwordsModel.js";
import SecurityQuestions from "../models/securityQuestionsModel.js";

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
    return res.status(200).send({
      message: "User registered successfully",
      success: true,
      user: user,
      id: user.id,
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

    // Handle successful login (e.g., proceed to TOTP authentication)
    res
      .status(200)
      .json({ message: "Login successful", success: true, userId: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.patch("/updateuser/:id", async (req, res) => {
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

router.get("/user/:id", async (req, res) => {
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

router.delete("/deleteuser/:id", async (req, res) => {
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

    res
      .status(200)
      .json({
        message: "User and associated data deleted successfully",
        statusbar: "success",
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
