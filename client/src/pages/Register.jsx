import React from "react";
import RegisterContainer from "../components/RegisterContainer";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Register = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <RegisterContainer />
      <Footer />
    </div>
  );
};

export default Register;
