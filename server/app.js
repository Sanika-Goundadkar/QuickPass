import express, { json } from "express";
import dotenv from "dotenv";
import connectDb from "./database/db.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
import userModel from "./models/userModel.js";


dotenv.config();
connectDb();

const app = express();
app.use(json());
app.use(cors());

app.use("/api", userRoutes);



app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT} `);
});
