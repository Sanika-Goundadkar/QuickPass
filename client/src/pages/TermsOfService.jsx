import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TermsOfService = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#1a1a1a] text-white flex flex-col items-center py-12">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text tracking-wide">
            Terms and Conditions
          </h1>
          <p className="text-lg md:text-xl text-gray-400">
            Please read our terms and conditions carefully.
          </p>
        </header>

        <section className="max-w-4xl w-full mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text tracking-wide">
            Introduction
          </h2>
          <p className="text-lg mb-6">
            Welcome to QuickPass! These Terms and Conditions outline the rules
            and regulations for the use of our website and services. By
            accessing or using our services, you agree to comply with and be
            bound by these terms. If you do not agree with any part of these
            terms, please do not use our services.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text tracking-wide">
            Use of Our Services
          </h2>
          <p className="text-lg mb-6">
            You agree to use our services only for lawful purposes and in
            accordance with these terms. You are responsible for maintaining the
            confidentiality of your account and password and for all activities
            that occur under your account.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text tracking-wide">
            Intellectual Property
          </h2>
          <p className="text-lg mb-6">
            All content, trademarks, and other intellectual property on our
            website are owned by or licensed to QuickPass. You may not use,
            copy, or reproduce any content without our prior written consent.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text tracking-wide">
            Limitation of Liability
          </h2>
          <p className="text-lg mb-6">
            To the maximum extent permitted by law, QuickPass shall not be
            liable for any indirect, incidental, special, or consequential
            damages arising out of or in connection with your use of our
            services.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text tracking-wide">
            Changes to Terms
          </h2>
          <p className="text-lg mb-6">
            We reserve the right to modify these terms at any time. Changes will
            be effective when we post the updated terms on our website. It is
            your responsibility to review these terms periodically.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text tracking-wide">
            Contact Us
          </h2>
          <p className="text-lg mb-6">
            If you have any questions about these terms and conditions, please
            contact us at{" "}
            <a
              href="mailto:quickpass360@gmail.com"
              className="text-[#ff5c33] hover:underline"
            >
              quickpass360@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default TermsOfService;
