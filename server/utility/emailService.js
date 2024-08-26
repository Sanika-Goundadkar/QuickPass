import nodemailer from "nodemailer";

// console.log(process.env.EMAIL_USER);
// console.log(process.env.EMAIL_PASS);

// Create a transporter object using Gmail's SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  port: 465,
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail email address
    pass: process.env.EMAIL_PASS, // Your Gmail password or app-specific password
  },
});

export const sendOtpToEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Your Gmail address
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${email}`);
  } catch (error) {
    console.log(`Failed to send OTP to ${email}:`, error.message);
    console.error("Error Details:", error);
  }
};
