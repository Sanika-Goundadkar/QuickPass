import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen text-white flex flex-col items-center py-12">
        <header className="text-center mb-8">
          <h3 className="text-xl sm:text-2xl my-1 mt-5">About</h3>
          <h1 className="lg:text-6xl text-4xl sm:text-5xl my-1 font-bold bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text tracking-wide mb-5">
            QuickPass
          </h1>
          <p className="text-lg md:text-xl text-gray-400">
            Your ultimate password management solution
          </p>
        </header>

        <section className="max-w-5xl mx-auto text-center px-4 md:px-8">
          <p className="text-lg md:text-xl mb-6">
            QuickPass is dedicated to making your life easier by eliminating the
            hassle of remembering complex passwords. With our secure and
            intuitive system, you can access your accounts effortlessly and keep
            your information safe.
          </p>
          <p className="text-lg md:text-xl mb-6">
            We believe in providing a seamless experience where you can focus on
            what matters without worrying about your passwords. Our mission is
            to offer a reliable and user-friendly service that caters to your
            password management needs.
          </p>
          <p className="text-lg md:text-xl mb-6">
            Join us on this journey to a worry-free digital life, where your
            passwords are securely managed and easily accessible, whenever and
            wherever you need them.
          </p>
        </section>

        <section className="max-w-5xl mx-auto mt-12 px-4 md:px-8">
          <h2 className="lg:text-3xl text-4xl sm:text-xl my-1 font-bold bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text tracking-wide mb-5">
            Our Vision
          </h2>
          <p className="text-lg md:text-xl mb-6">
            To create a world where security meets simplicity, making password
            management accessible and stress-free for everyone.
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default About;
