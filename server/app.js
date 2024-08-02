import dotenv from "dotenv";
import express, { json } from "express";
import connectDb from "./database/db.js";
import userRoutes from "./routes/userRoutes.js";
import passwordRoutes from "./routes/passwordRoutes.js";
import otpRoutes from "./routes/otpRoutes.js";

import cors from "cors";

dotenv.config();
connectDb();

const app = express();
app.use(json());
app.use(cors());

app.use("/api", userRoutes);
app.use("/api/", passwordRoutes);
app.use("/api/", otpRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
