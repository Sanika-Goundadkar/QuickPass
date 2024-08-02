import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BackButton from "./BackButton";
// import { set } from "mongoose";

// axios.defaults.baseURL = "http://localhost:5000"; // Replace with your backend server URL

const LoginContainer = () => {
  const [email, setEmail] = useState("");
  const [masterPassword, setMasterPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const loginResponse = await axios.post("/api/login", {
        email,
        masterPassword,
      });

      // Handling successful login (Redirecting to OTP authentication)
      if (loginResponse.data.success) {
        console.log("Login successful:", loginResponse.data);
        alert("Login successful");
        localStorage.setItem("email", email); // Store email in local storage
        navigate("/otp");
        try {
          const otpResponse = await axios.post("/api/send-otp", {
            email,
          });
          if (otpResponse.data.success) {
            console.log("OTP sent successful:", otpResponse.data);
            alert("OTP sent successful");
          } else {
            setError("Failed to send OTP");
          }
        } catch (error) {
          setError(error.response?.data?.message || "Error sending OTP");
          console.log(error);
        }
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <BackButton />
      <div className="max-w-md w-full flex flex-col bg-gray-800 shadow-md rounded-lg p-8">
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <div className="flex flex-col items-center justify-between">
          <div className="flex flex-col items-center py-2">
            <h3 className="text-2xl my-1">Login to</h3>
            <h1 className="text-4xl my-1 font-bold mb-6 text-center bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text tracking-wide">
              QuickPass
            </h1>
          </div>
          <div className="mx-0 px-0">
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white max-w-md"
                  required
                />
              </div>
              <div className="mb-4 mx-0 px-0">
                <input
                  type="password"
                  placeholder="Master password"
                  id="masterPassword"
                  value={masterPassword}
                  onChange={(e) => setMasterPassword(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white max-w-md"
                  required
                />
                <p className="text-white pt-3 text-sm">
                  Forgot password?{" "}
                  <Link
                    to="/resetpassword"
                    className="text-blue-700 hover:text-blue-500"
                  >
                    Click here
                  </Link>
                </p>
              </div>
              <div className="flex flex-col items-center justify-between mx-0 px-0">
                <button
                  type="submit"
                  className={`bg-gradient-to-r from-orange-500 to-orange-800 text-white w-20  my-3 py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </button>
                <p className="text-white text-sm">
                  New to QuickPass?{" "}
                  <Link
                    to="/register"
                    className="text-blue-700 hover:text-blue-500"
                  >
                    Click here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;
