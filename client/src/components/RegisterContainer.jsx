import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../api/axiosInstance.js";

const RegisterContainer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axiosInstance.post("/register", {
        name,
        email,
        password,
      });

      if (response.data.success) {
        // Handle successful registration (e.g., show success message or redirect)
        localStorage.setItem("email", email);
        console.log("Registration successful:", response.data);
        localStorage.setItem("userID", response.data.user.id);

        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);

        alert("Registration successful!");
        localStorage.getItem("email", email);

        try {
          const userID = localStorage.getItem("userID");
          console.log(userID);
          const otpResponse = await axiosInstance.post("/send-otp", {
            email,
          });
          // const id = otpResponse.data.id;
          if (otpResponse.data.success) {
            console.log("OTP sent successful:", otpResponse.data);
            alert("OTP sent successful");
            navigate("/register-otp");
            console.log("redirecting to OTP authentication");

            // window.location.replace("/otp");
          } else {
            setError("Failed to send OTP");
            const deleteUserResponse = await axiosInstance.post(
              "/deleteuser/userID"
            );
            console.log("User deleted", deleteUserResponse);
          }
        } catch (error) {
          setError(error.response?.data?.message || "Error sending OTP");
          console.log(error);
        }
      } else {
        toast.error("Registration failed!");
      }
    } catch (error) {
      setError(error.response.data.message);
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <BackButton />
      <div className="max-w-md w-full bg-gray-800 shadow-md rounded-lg p-8">
        <div className="flex flex-col items-center justify-between">
          <h3 className="text-2xl my-1">Register to</h3>
          <h1 className="text-4xl my-1 font-bold mb-6 text-center bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text tracking-wide">
            QuickPass
          </h1>
        </div>
        <center>{error && <p className="text-red-500 mb-4">{error}</p>}</center>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <input
              type="text"
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded-md w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded-md w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              id="password"
              placeholder="Set master password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded-md w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white"
              required
            />
          </div>
          <div className="flex flex-col items-center justify-between">
            <button
              type="submit"
              title="Register to QuickPass"
              className={`bg-gradient-to-r from-orange-500 to-orange-800 text-white my-3 py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
            <p className="text-white text-sm">
              Already registered?{" "}
              <Link to="/login" className="text-blue-700 hover:text-blue-500">
                Click here to login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterContainer;
