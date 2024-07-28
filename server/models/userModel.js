import { Schema, model } from "mongoose";

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: [true, "User already exists"],
    },
    password: {
      type: String,
      required: [true, "Please enter passsword"],
    },
  },
  {
    timestamps: true,
  }
);

// Compare the entered password with the stored password
userSchema.methods.comparePassword = async function (enteredPassword) {
  // Directly compare the passwords as plain text
  return enteredPassword === this.password;
};

export default model("User", userSchema); //User is the name of collection