import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-20 border-t py-10 border-neutral-700">
      <div className="container mx-auto text-center">
        <p className="mb-4">
          &copy; 2024 &nbsp; QuickPass. &nbsp; All rights reserved.
        </p>
        <nav className="flex justify-center space-x-4">
          <Link to="/privacy" className="text-neutral-500 hover:text-white">
            Privacy Policy
          </Link>
          <Link
            to="/terms-of-service"
            className="text-neutral-500 hover:text-white"
          >
            Terms of Service
          </Link>
          <Link to="/contact" className="text-neutral-500 hover:text-white">
            Contact Us
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
