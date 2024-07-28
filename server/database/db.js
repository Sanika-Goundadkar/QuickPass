import { connect } from "mongoose";

export default async () => {
  try {
    await connect(process.env.DB);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
  }
};
