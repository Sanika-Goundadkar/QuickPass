import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterOtpVerification = () => {
  const email = localStorage.getItem("email");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("email") !== null;

  if (!isAuthenticated) {
    // alert("You must authenticate yourself");

    // Redirect the user to the login page if not authenticated
    window.location.replace("/login");
    return null;
  }

  const handleChange = async (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add OTP verification logic here
    try {
      const response = await axios.post("/api/verify-otp", {
        email,
        otp,
      });
      if (response.data.success) {
        alert("OTP verified successfully!");
        localStorage.removeItem(email);

        console.log("Before removing email: ", localStorage.getItem("email"));
        console.log("After removing email: ", localStorage.getItem("email"));
        navigate("/security-questions");
      } else {
        setError("Invalid OTP");
      }
    } catch (error) {
      console.log(error);
      setError(response.data.message, "Error verifying OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-6 items-center justify-center rounded-lg w-80 mx-auto text-center">
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <p className="text-sm">OTP sent to your email: {email}</p>
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
  );
};

export default RegisterOtpVerification;