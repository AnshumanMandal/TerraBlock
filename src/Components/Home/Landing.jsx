import React from "react";
import Three from "./Three";
import About from "./About";
import Map from "./Map";
import Spline from "@splinetool/react-spline";

const Landing = () => {
  return (
    <>
      <div className="h-screen w-full flex items-center justify-center realative">
        <div className="pr-10 font-bold absolute left-10 bottom-32  uppercase">
          <h1 className="text-8xl">There is a <br /> better  way to  <br /><span className="imp">OWN</span></h1>
          <div className="flex items-center gap-5 pt-10 font-bold">
            <button className="bg-[#8C8C8C] text-2xl px-10 py-3 rounded-full">Explore Now</button>
            <button className="bg-yellow-500 text-2xl px-10 py-3 rounded-full">What is this Actually ?</button>
          </div>
        </div>
        <div className="w-1/4 h-full"></div>
        <div className="h-full w-3/4 relative">
        <div className="h-10 w-40 absolute bg-[#222222] bottom-4 right-0"></div>
          <Spline scene="https://prod.spline.design/9IgB8nDIkkxCz31D/scene.splinecode" />
        </div>
      </div>
      <About></About>
      <Map></Map>
    </>
  );
};

export default Landing;
