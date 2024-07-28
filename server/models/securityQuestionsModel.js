import { Schema, model } from "mongoose";

const securityQuestionSchema = Schema(
  {
    questionOne: {
      type: String,
      required: [true, "Please answer this question"],
    },
    questionTwo: {
      type: String,
      required: [true, "Please answer this question"],
    },
    questionThree: {
      type: String,
      required: [true, "Please answer this question"],
    },
    questionFour: {
      type: String,
      required: [true, "Please answer this question"],
    },
  },
  {
    timestamps: true,
  }
);

export default model("SecurityQuestions", securityQuestionSchema);