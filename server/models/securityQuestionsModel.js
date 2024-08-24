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

securityQuestionSchema.pre("save", async function (next) {
  this.questionOne = await bcrypt.hash(this.questionOne, 10);
  this.questionTwo = await bcrypt.hash(this.questionTwo, 10);
  this.questionThree = await bcrypt.hash(this.questionThree, 10);
  this.questionFour = await bcrypt.hash(this.questionFour, 10);

  next();
});

securityQuestionSchema.methods.compareQuestion = async function (
  questionOne,
  questionTwo,
  questionThree,
  questionFour
) {
  const isMatch =
    (await bcrypt.compare(questionOne, this.questionOne)) &&
    (await bcrypt.compare(questionTwo, this.questionTwo)) &&
    (await bcrypt.compare(questionThree, this.questionThree)) &&
    (await bcrypt.compare(questionFour, this.questionFour));
  return isMatch;
};

export default model("SecurityQuestions", securityQuestionSchema);
