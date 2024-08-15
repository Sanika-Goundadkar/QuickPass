import express from "express";
import User from "../models/userModel.js";
const router = express.Router();
import jwt from "jsonwebtoken";

router.post("/refresh-token", async (req, res) => {
  const { refreshToken } = req.body;
  console.log(refreshToken);

  // Verify the refresh token
  if (!refreshToken) {
    return res.status(403).json({ message: "Refresh token not provided" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    console.log("decoded", decoded);

    const user = await User.findById(decoded.userId);
    console.log(user);

    if (!user) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // Generate new tokens
    const newAccessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );
    const newRefreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      }
    );

    console.log(newAccessToken);
    console.log(newRefreshToken);

    res.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: "Invalid refresh token" });
  }
});

export default router;
