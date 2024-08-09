import React from "react";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy.jsx";
import TermsOfService from "./pages/TermsOfService";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OtpVerification from "./pages/Otp.jsx";
import RegisterOtpVerification from "./pages/RegisterOtp.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import SecurityQuestions from "./pages/SecurityQuestions.jsx";
import VerifySecurityQuestions from "./pages/VerifySecurityQuestions.jsx";

const App = () => {
  return (
    <Router>
      <div>
        <ToastContainer />
        <Routes>
          {/* public routes */}
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />

          {/* private routes */}
          <Route path="/register-otp" element={<RegisterOtpVerification />} />
          <Route path="/security-questions" element={<SecurityQuestions />} />
          <Route path="/otp" element={<OtpVerification />} />
          <Route
            path="/verify-security-questions"
            element={<VerifySecurityQuestions />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
