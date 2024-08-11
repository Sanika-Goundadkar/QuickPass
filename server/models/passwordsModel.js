import { Schema, model } from "mongoose";

const passwordSchema = new Schema(
  {
    accountName: {
      type: String,
      required: true,
      index: true,
    },
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      // required: true,
    },
    category: {
      type: String,
      // required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default model("Password", passwordSchema);
