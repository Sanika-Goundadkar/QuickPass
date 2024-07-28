import React from "react";
import LoginContainer from "../components/LoginContainer";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Login = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <LoginContainer />
      <Footer />
    </div>
  );
};

export default Login;
