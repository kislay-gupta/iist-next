"use client";
import React from "react";
import Marquee from "react-fast-marquee";

const CustomMarquee = () => {
  return (
    <div>
      {" "}
      <Marquee
        gradient={true}
        gradientColor={"rgb(255, 255, 255)"}
        speed={40}
        className="overflow-hidden bg-gray-100 py-3"
      >
        <p className="text-gray-800 mx-8 font-medium">Welcome Message</p>
      </Marquee>
    </div>
  );
};

export default CustomMarquee;
