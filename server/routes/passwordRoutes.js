import express from "express";
import crypto from "crypto";
import {
  encryptPassword,
  decryptPassword,
} from "../utility/encryptionUtility.js";
import passwordsModel from "../models/passwordsModel.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/passwords", authenticateToken, async (req, res) => {
  console.log(req.body);
  try {
    const { accountName, userName, password, url, category, userID } = req.body;
    const { iv, encryptedData } = encryptPassword(password);
    console.log("User ID from request body:", userID);

    const newPassword = new passwordsModel({
      accountName,
      userName,
      password: encryptedData, // Store encrypted password
      url,
      category,
      iv, // Store initialization vector
      createdBy: userID, // Assuming you have user info in req.user
    });

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
    const { password } = req.body;

    // If password is being updated, encrypt it
    if (password) {
      const { iv, encryptedData } = encryptPassword(password);
      req.body.password = encryptedData;
      req.body.iv = iv; // Make sure to include IV if needed
    }

    const updatedPassword = await passwordsModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedPassword) {
      return res.status(404).send({
        message: "Password not found",
        success: false,
      });
    }

    return res.status(200).send({
      message: "Password updated successfully",
      success: true,
      password: updatedPassword,
    });
  } catch (error) {
    console.error("Error in Update Password API", error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/passwords", authenticateToken, async (req, res) => {
  // route to get all the passwords of logged in user
  try {
    const userId = req.query.userID;
    console.log("Received userID:", userId);

    // Fetch passwords from database
    const passwords = await passwordsModel.find({ createdBy: userId });
    console.log("Passwords retrieved:", passwords);

    // Decrypt passwords
    const decryptedPasswords = passwords.map((password) => {
      const decryptedPassword = decryptPassword(password.password, password.iv);
      return {
        ...password._doc, // Spread the original document to include all fields
        password: decryptedPassword, // Replace encrypted password with decrypted password
      };
    });

    res.status(200).json({
      success: true,
      passwords: decryptedPasswords,
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
