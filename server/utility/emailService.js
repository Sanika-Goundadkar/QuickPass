import nodemailer from "nodemailer";
import mg from "nodemailer-mailgun-transport";

const auth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY, // Your Mailgun API key
    domain: process.env.MAILGUN_DOMAIN, // Your Mailgun domain
  },
};
// console.log(process.env.MAILGUN_API_KEY);
// console.log(process.env.MAILGUN_DOMAIN);

const transporter = nodemailer.createTransport(mg(auth));

export const sendOtpToEmail = async (email, otp) => {
  const mailOptions = {
    from: "no-reply@yourdomain.com", // Your verified sender email
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
