import React from "react";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy.jsx";
import TermsOfService from "./pages/TermsOfService";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OtpVerification from "./pages/Otp.jsx";
import RegisterOtpVerification from "./pages/RegisterOtp.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import ForgotPasswordOtp from "./pages/ForgotPasswordOtp.jsx";
import VerifyForgotPasswordSecurityQuestions from "./pages/VerifyForgotPasswordSecurityQuestions.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx";
import SecurityQuestions from "./pages/SecurityQuestions.jsx";
import VerifySecurityQuestions from "./pages/VerifySecurityQuestions.jsx";
import Dashboard from "./pages/Dashboard";
import UserProfile from "./pages/UserProfile.jsx";

const App = () => {
  return (
    <Router>
      <div>
        <ToastContainer />
        <Routes>
          {/* public routes */}
          <Route exact path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/forgot-password-otp" element={<ForgotPasswordOtp />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />

          {/* private routes */}
          <Route path="/register-otp" element={<RegisterOtpVerification />} />
          <Route path="/otp" element={<OtpVerification />} />
          <Route path="/security-questions" element={<SecurityQuestions />} />
          <Route
            path="/verify-security-questions"
            element={<VerifySecurityQuestions />}
          />
          <Route
            path="/verify-forgot-password-security-questions"
            element={<VerifyForgotPasswordSecurityQuestions />}
          />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
