import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Privacy() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#1a1a1a] text-white flex flex-col items-center py-12">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text tracking-wide">
            Privacy Policy
          </h1>
          <p className="text-lg md:text-xl text-gray-400">
            Your privacy is important to us. Please review our privacy policy.
          </p>
        </header>

        <section className="max-w-4xl w-full mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text tracking-wide">
            Introduction
          </h2>
          <p className="text-lg mb-6">
            Welcome to QuickPass! This Privacy Policy explains how we collect,
            use, disclose, and safeguard your information when you visit our
            website and use our services. By using our services, you consent to
            the practices described in this policy.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text tracking-wide">
            Information We Collect
          </h2>
          <p className="text-lg mb-6">
            We may collect personal information that you provide directly, such
            as your name, email address, and other contact details.
            Additionally, we may collect information automatically, such as IP
            addresses, browser types, and usage data.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text tracking-wide">
            How We Use Your Information
          </h2>
          <p className="text-lg mb-6">
            We use your information to provide, improve, and personalize our
            services, communicate with you, and ensure the security of our
            services. We may also use your information to comply with legal
            obligations and for other purposes disclosed to you at the time of
            collection.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text tracking-wide">
            Sharing Your Information
          </h2>
          <p className="text-lg mb-6">
            We do not sell, trade, or otherwise transfer your personal
            information to outside parties except as described in this policy.
            We may share your information with trusted third parties who assist
            us in operating our website and providing services, provided they
            agree to keep the information confidential.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text tracking-wide">
            Data Security
          </h2>
          <p className="text-lg mb-6">
            We implement reasonable security measures to protect your
            information from unauthorized access, alteration, disclosure, or
            destruction. However, no method of transmission over the internet or
            electronic storage is 100% secure.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text tracking-wide">
            Your Rights
          </h2>
          <p className="text-lg mb-6">
            You have the right to access, correct, or delete your personal
            information. You may also have the right to object to or restrict
            certain types of processing of your information. To exercise these
            rights, please contact us at the provided contact details.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text tracking-wide">
            Changes to This Privacy Policy
          </h2>
          <p className="text-lg mb-6">
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with an updated effective date. We
            encourage you to review this policy periodically to stay informed
            about how we are protecting your information.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text tracking-wide">
            Contact Us
          </h2>
          <p className="text-lg mb-6">
            If you have any questions about this Privacy Policy or our data
            practices, please contact us at{" "}
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
}

export default Privacy;
