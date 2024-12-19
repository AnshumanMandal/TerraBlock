import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";
import { FiFacebook } from "react-icons/fi";

const Footer = () => {
  return (
    <>
      <div className="px-10">
        <h1 className="text-[20em] font-black foot">
          GET <span>HOME</span>
        </h1>
        <h1 className="uppercase text-4xl">
          your first and favourite room rental service
        </h1>
        <div className="flex items-center gap-10 text-2xl pt-32">
          <h1>List Room</h1>
          <h1>Rent Room</h1>
          <h1>Community</h1>
          <h1>Help</h1>
        </div>
        <div className="flex items-center justify-between pb-10">
          <div className="flex items-center pt-16 text-4xl gap-10">
            <FaInstagram />
            <FiYoutube />
            <FiFacebook />
          </div>
          <div className="text-xl font-bold">
            <h1><span className="imp">Email</span> : abc@gmail.com</h1>
            <h1><span className="imp">Contact</span> : 5638564857</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
