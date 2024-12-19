import React from "react";
import { FiSearch } from "react-icons/fi";
import PropertyMap from "../Map/PropertyMap";

const Map = () => {
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Property Locations</h2>
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search location..."
            className="pl-10 pr-4 py-2 rounded-full bg-[#2A2A2A] border border-[#333333] focus:outline-none focus:border-[#E7D54E]"
          />
        </div>
      </div>
      <div className="h-[500px] rounded-lg overflow-hidden">
        <PropertyMap />
      </div>
    </div>
  );
};

export default Map;
