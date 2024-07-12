import React from "react";

const CallToAction = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <h3 className="text-3xl sm:text-4xl lg:text-4xl text-center mt-6 tracking-wide">
        Protect your
        <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
          {" "}
          Digital Life Now!
        </span>
      </h3>
      <div className="justify-center my-10">
        <a
          href="#"
          className="text-center py-3 px-4 mx-3 rounded-md bg-gradient-to-r from-orange-500 to-orange-800"
        >
          Get Started &nbsp; &gt;
        </a>
      </div>
    </div>
  );
};

export default CallToAction;
