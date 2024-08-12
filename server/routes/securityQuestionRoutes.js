import express from "express";
import securityQuestionsModel from "../models/securityQuestionsModel.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/security-questions", authenticateToken, async (req, res) => {
  console.log(req.body);
  try {
    // const newQuestion = new securityQuestionsModel(req.body);
    // await newQuestion.save();

    // Extract the security questions and userID from the request body
    const { questionOne, questionTwo, questionThree, questionFour, userID } =
      req.body;

    // Create a new SecurityQuestions document
    const newQuestion = new securityQuestionsModel({
      questionOne,
      questionTwo,
      questionThree,
      questionFour,
      belongsTo: userID,
    });

    // Save the document to the database
    await newQuestion.save();

    return res.status(200).send({
      message: "Security question added successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error (in security-questions)" });
  }
});

router.post("/verify-security-questions", authenticateToken, async (req, res) => {
  const { questionOne, questionTwo, questionThree, questionFour, userID } =
    req.body;
  // const id = req.params;
  try {
    const securityQuestions = await securityQuestionsModel.findOne({
      belongsTo: userID,
      // userID,
    });
    console.log(securityQuestions);

    if (!securityQuestions) {
      return res.status(404).json({ error: "Security questions not found" });
    }

    const isMatchOne = questionOne === securityQuestions.questionOne;
    const isMatchTwo = questionTwo === securityQuestions.questionTwo;
    const isMatchThree = questionThree === securityQuestions.questionThree;
    const isMatchFour = questionFour === securityQuestions.questionFour;

    if (isMatchOne && isMatchTwo && isMatchThree && isMatchFour) {
      res.status(200).json({
        message: "Security questions verified successfully",
        success: true,
      });
    } else {
      res.status(400).json({
        success: false,
        error: "Security answers are incorrect",
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/delete-security-questions/:userID", authenticateToken, async (req, res) => {
  const { userID } = req.params;

  try {
    // Find and delete the security questions associated with the user
    const result = await securityQuestionsModel.findOneAndDelete({
      belongsTo: userID,
    });

    if (!result) {
      return res.status(404).json({ error: "Security questions not found" });
    }

    return res
      .status(200)
      .json({ message: "Security questions deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
