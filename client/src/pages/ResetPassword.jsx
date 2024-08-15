import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/forgot-password-otp", { email });
      localStorage.setItem("email", email);
      console.log("email set to localStorage", email);

      console.log(response);

      setEmail("");
      if (response.status === 200) {
        localStorage.setItem("userID", response.data.userID);
        //redirecting to the Set New Password page
        toast.success("OTP sent successfully!");

        navigate("/forgot-password-otp");
      }
    } catch (error) {
      console.log("Error sending reset password OTP", error);
      setError(error.response.data.message || "Error sending OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg w-80 mx-auto text-center">
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <div className="flex flex-col items-center">
          <h3 className="text-2xl my-1">Reset</h3>
          <h1 className="text-4xl my-1 font-bold mb-6 text-center bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text tracking-wide">
            Password
          </h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter registered email"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white max-w-md"
              required
            />
          </div>
          <button
            type="submit"
            title="Send OTP to registered email"
            className="bg-gradient-to-r from-orange-500 to-orange-800 text-white py-2 px-4 rounded-md"
          >
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
