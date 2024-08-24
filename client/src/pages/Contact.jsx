import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#1a1a1a] text-white flex flex-col items-center py-12">
        <header className="text-center mb-8">
          <h1 className="lg:text-6xl text-4xl sm:text-5xl my-1 font-bold bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text tracking-wide mb-5">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl text-gray-400">
            We're here to assist you with any questions or concerns you may
            have.
          </p>
        </header>

        <section className="max-w-4xl w-full mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl sm:text-5xl my-1 font-bold bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text tracking-wide mb-5">
            Get In Touch
          </h2>
          <p className="text-lg md:text-xl mb-6">
            At QuickPass, we're committed to providing excellent customer
            support. Whether you have a question about our services, need help
            with an issue, or simply want to provide feedback, we're here for
            you.
          </p>
          <p className="text-lg md:text-xl mb-6">
            You can reach us at{" "}
            <a
              href="mailto:quickpass360@gmail.com"
              className="text-[#ff5c33] hover:underline"
            >
              quickpass360@gmail.com
            </a>
            . We strive to respond to all inquiries within 24 hours. Your
            satisfaction is our priority, and we look forward to assisting you!
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
