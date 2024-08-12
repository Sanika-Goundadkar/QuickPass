import express from "express";
import passwordsModel from "../models/passwordsModel.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/passwords", authenticateToken, async (req, res) => {
  console.log(req.body);
  try {
    const newPassword = new passwordsModel(req.body);
    await newPassword.save();
    return res.status(200).send({
      message: "Password added successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error in Add Password api", error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.patch("/passwords/:id", authenticateToken, async (req, res) => {
  console.log(req.body);
  try {
    const updatedPassword = await passwordsModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    return res.status(200).send({
      message: "Password updated successfully",
      success: true,
      password: updatedPassword,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/passwords", authenticateToken, async (req, res) => {
  // route to get all the passwords of logged in user
  try {
    const userId = req.query.userID;
    console.log("Received userID:", userId);

    const passwords = await passwordsModel.find({ createdBy: userId });
    console.log("Passwords retrieved:", passwords);

    res.status(200).json({
      success: true,
      passwords: passwords,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch passwords",
      error: error.message,
    });
    console.log(error);
  }
});

router.delete("/passwords/:id", authenticateToken, async (req, res) => {
  console.log(req.params);
  try {
    const { id } = req.params;
    await passwordsModel.findByIdAndDelete(id);
    return res.status(200).send({
      message: "Password deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
