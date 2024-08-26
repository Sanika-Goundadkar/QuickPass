import Navbar from "../components/Navbar.jsx";
import HeroSection from "../components/HeroSection.jsx";
import FeatureSection from "../components/FeatureSection.jsx";
import Workflow from "../components/Workflow.jsx";
import Footer from "../components/Footer.jsx";
import CallToAction from "../components/CallToAction.jsx";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("login");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <HeroSection />
        <FeatureSection />
        <Workflow />
        <CallToAction />
        <Footer />
      </div>
    </>
  );
};

export default Home;
