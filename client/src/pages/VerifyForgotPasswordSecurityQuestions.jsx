import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../api/axiosInstance.js";

const VerifyForgotPasswordSecurityQuestions = () => {
  const userID = localStorage.getItem("userID");
  const [questionOne, setQuestionOne] = useState("");
  const [questionTwo, setQuestionTwo] = useState("");
  const [questionThree, setQuestionThree] = useState("");
  const [questionFour, setQuestionFour] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("email") !== null;

  if (!isAuthenticated) {
    // alert("You must authenticate yourself");

    // Redirect the user to the login page if not authenticated
    window.location.replace("/login");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Add security question validation here
    try {
      const response = await axiosInstance.post(
        "/verify-forgotpassword-security-questions",
        {
          questionOne,
          questionTwo,
          questionThree,
          questionFour,
          userID,
        }
      );

      if (response.data.success) {
        console.log("Questions verified successfully!", response);
        toast.success("Password reset successfully");
        navigate("/reset-password");
      }
    } catch (error) {
      console.log("Error sending the request for security questions", error);
      setError(
        error.response?.data?.error ||
          "An error occurred while verifying the security questions."
      );
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-gray-800 shadow-md rounded-lg p-8">
        <div className="flex flex-col items-center justify-between">
          <h3 className="text-2xl my-1">Answer the</h3>
          <h1 className="text-4xl my-1 font-bold mb-6 text-center bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text tracking-wide">
            Security Questions
          </h1>
        </div>
        <center>
          {error && <p className="text-red-500 mb-4">{error.toString()}</p>}
        </center>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="q1">
              <b>Q.</b> What was the name of your first pet?
            </label>
            <input
              type="text"
              id="q1"
              placeholder="Enter your answer"
              value={questionOne}
              onChange={(e) => setQuestionOne(e.target.value)}
              className="shadow appearance-none border rounded-md w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="q2">
              <b>Q.</b> What was your childhood nickname?
            </label>
            <input
              type="text"
              id="q2"
              placeholder="Enter your answer"
              value={questionTwo}
              onChange={(e) => setQuestionTwo(e.target.value)}
              className="shadow appearance-none border rounded-md w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="q3">
              <b>Q.</b> What is your favorite book?
            </label>
            <input
              type="text"
              id="q3"
              placeholder="Enter your answer"
              value={questionThree}
              onChange={(e) => setQuestionThree(e.target.value)}
              className="shadow appearance-none border rounded-md w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="q4">
              <b>Q.</b> What was your dream job as a child?
            </label>
            <input
              type="text"
              id="q4"
              placeholder="Enter your answer"
              value={questionFour}
              onChange={(e) => setQuestionFour(e.target.value)}
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

export default VerifyForgotPasswordSecurityQuestions;
