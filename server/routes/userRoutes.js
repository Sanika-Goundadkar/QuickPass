import express from "express";
import User from "../models/userModel.js";

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
      return res.status(400).json({ message: "Invalid email" });
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

    const updateUser = req.body;
    console.log("Update User:", updateUser);

    await User.findByIdAndUpdate(id, updateUser, { new: true }); //findByIdAndUpdate  --> function of mongoose
    res.status(200).json({ message: "User details updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating the user" });
  }
});

router.delete("/deleteuser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("ID:", id);
    const deleteUser = req.body;
    console.log("Delete User: ", deleteUser);

    const user = await User.findById(id);
    console.log("User details", user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndDelete(id, deleteUser, { new: true }); //findByIdAndDelete --> function of mongoose
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
