import dotenv from "dotenv";
import express, { json } from "express";
import connectDb from "./database/db.js";
import userRoutes from "./routes/userRoutes.js";
import passwordRoutes from "./routes/passwordRoutes.js";
import otpRoutes from "./routes/otpRoutes.js";
import securityQuestionRoutes from "./routes/securityQuestionRoutes.js";
import bodyParser from "body-parser";

import cors from "cors";

dotenv.config();
connectDb();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(json());
app.use(cors());

app.use("/api/", userRoutes);
app.use("/api/", passwordRoutes);
app.use("/api/", otpRoutes);
app.use("/api/", securityQuestionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
