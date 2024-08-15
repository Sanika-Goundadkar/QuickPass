import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const securityQuestionSchema = new Schema(
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
    belongsTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

securityQuestionSchema.methods.compareQuestion = function (
  questionOne,
  questionTwo,
  questionThree,
  questionFour
) {
  const isMatch =
    bcrypt.compareSync(questionOne, this.questionOne) &&
    bcrypt.compareSync(questionTwo, this.questionTwo) &&
    bcrypt.compareSync(questionThree, this.questionThree) &&
    bcrypt.compareSync(questionFour, this.questionFour);
  return isMatch;
};

export default model("SecurityQuestions", securityQuestionSchema);
