import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar.jsx";

const OtpVerification = () => {
  const email = localStorage.getItem("email");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("email") !== null;

  if (!isAuthenticated) {
    // alert("You must authenticate yourself");

    // Redirect the user to the login page if not authenticated
    navigate("/login", { replace: true });
    return null;
  }

  const handleChange = async (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add OTP verification logic here
    try {
      const response = await axiosInstance.post("/verify-otp", {
        email,
        otp,
      });
      if (response.data.success) {
        toast.success("OTP verified successfully!");

        navigate("/verify-security-questions", { replace: true });
      } else {
        setError("Invalid OTP");
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.message, "Error verifying OTP");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-gray-800 p-6 items-center justify-center rounded-lg w-80 mx-auto text-center">
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          <p className="text-sm py-3">OTP sent to your email: {email}</p>
          <h3 className="text-2xl my-1">Verify</h3>
          <h1 className="text-4xl my-1 font-bold mb-6 text-center bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text tracking-wide">
            OTP
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                value={otp}
                onChange={handleChange}
                maxLength="6"
                required={true}
                placeholder="Enter OTP"
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white max-w-md"
              />
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-orange-500 to-orange-800 text-white py-2 px-4 rounded-md"
            >
              Verify
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default OtpVerification;
