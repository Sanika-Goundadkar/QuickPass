import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../api/axiosInstance.js";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post("/reset-password", {
        newPassword,
      });
      console.log(response);

      if (response.data.success) {
        toast.success("Password reset successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log("Error resetting password", error);
      setError(
        error.response?.data?.message ||
          "An error occurred while resetting the password."
      );
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-gray-800 shadow-md rounded-lg p-8">
        <div className="flex flex-col items-center justify-between">
          <h3 className="text-2xl my-1">Set a New</h3>
          <h1 className="text-4xl my-1 font-bold mb-6 text-center bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text tracking-wide">
            Password
          </h1>
        </div>
        <center>
          {error && <p className="text-red-500 mb-4">{error.toString()}</p>}
        </center>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="new-password">
              <b>New Password</b>
            </label>
            <input
              type="password"
              id="new-password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="shadow appearance-none border rounded-md w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirm-password">
              <b>Confirm Password</b>
            </label>
            <input
              type="password"
              id="confirm-password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="shadow appearance-none border rounded-md w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white"
              required
            />
          </div>
          <div className="flex flex-col items-center justify-between">
            <button
              type="submit"
              className={`bg-gradient-to-r from-orange-500 to-orange-800 text-white my-3 py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
