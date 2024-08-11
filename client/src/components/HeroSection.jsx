import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
        No more remembering
        <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
          {" "}
          the Passwords!
        </span>
      </h1>
      <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
        Say goodbye to the hassle of forgotten passwords! With our secure and
        intuitive system, you can access your accounts effortlessly and keep
        your information safe without the stress of remembering complex
        passwords. Experience seamless and worry-free login today.
      </p>
      <div className="flex justify-center my-10">
        <Link
          to="/register"
          className="text-center py-3 px-4 mx-3 rounded-md bg-gradient-to-r from-orange-500 to-orange-800"
          title="Register to QuickPass"
        >
          Get Started &nbsp; &gt;
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
