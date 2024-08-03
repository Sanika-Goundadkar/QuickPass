import express from "express";
import passwordsModel from "../models/passwordsModel.js";

const router = express.Router();

router.post("/passwords", async (req, res) => {
  console.log(req.body);
  try {
    const newPassword = new passwordsModel(req.body);
    await newPassword.save();
    return res.status(200).send({
      message: "Password added successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.patch("/passwords/:id", async (req, res) => {
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

// router.get("/passwords/:id", async (req, res) => {
//     // route to get all the passwords
// });

router.delete("/passwords/:id", async (req, res) => {
  console.log(req.body);
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
