import express from "express";
import securityQuestionsModel from "../models/securityQuestionsModel.js";

const router = express.Router();

router.post("/security-questions", async (req, res) => {
    console.log(req.body);
    try {
        const newQuestion = new securityQuestionsModel(req.body);
        await newQuestion.save();
        return res.status(200).send({
            message: "Security question added successfully",
            success: true,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});