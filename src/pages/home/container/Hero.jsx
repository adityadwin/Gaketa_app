/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Link } from "react-router-dom";
import { images } from "../../../constants";

const Hero = () => {
  return (
    <div className="grid h-screen grid-cols-1 bg-slate-800 lg:grid-cols-2">
      <div className="bg-[#E8E2E2] p-12 sm:p-8 md:p-10 lg:p-12">
        <h1 className="font-display text-3xl font-semibold text-[#2D2727] md:text-4xl lg:text-6xl">
          THE BEAUTY OF HANDMADE CRAFTS LIES IN THE UNIQUE TOUCH OF THE ARTIST
        </h1>
        <p className="text-semibold mt-4 text-lg lg:text-xl">
          Immerse yourself in a world where creativity knows no bounds, and
          every creation is a unique dance of imagination and craftsmanship.
        </p>
        <div className="mt-10">
          <Link to="/blog">
            <button className="h-14 w-40 rounded-full border-2 border-[#b9503e] text-lg font-bold text-[#b9503e] transition duration-150 hover:bg-[#b9503e] hover:text-slate-200 lg:text-xl">
              Explore more
            </button>
          </Link>
        </div>
      </div>
      <div className="flex hidden h-full items-start justify-center bg-[#E8E2E2] p-8 lg:flex">
        <img src={images.Modern} className="max-w-lg rounded-lg" />
      </div>
    </div>
  );
};

export default Hero;
