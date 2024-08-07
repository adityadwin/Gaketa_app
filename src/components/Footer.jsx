import React from "react";
import { AiFillYoutube, AiFillInstagram } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { BsTelegram } from "react-icons/bs";

import { images } from "../constants";

const Footer = () => {
  return (
    <section className="bg-dark-hard">
      <footer className="container mx-auto grid grid-cols-1 gap-y-10 gap-x-6 px-4 py-4 pt-10 md:grid-cols-12 md:pt-10">
        <div className="col-span-1 md:col-span-12">
          <div className="flex flex-col items-center">
            <img
              src={images.Logo}
              alt="logo"
              className="mx-auto brightness-0 invert"
            />
            <p className="mt-4 text-center text-sm text-dark-light">
              The Beauty of Handmade Crafts
            </p>
            <ul className="mt-5 flex items-center justify-center space-x-4 text-gray-300 md:justify-start">
              <li>
                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                  <AiFillYoutube className="h-auto w-6" />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/adityadwn99_/">
                  <AiFillInstagram className="h-auto w-6" />
                </a>
              </li>
              <li>
                <a href="https://id-id.facebook.com/">
                  <FaFacebook className="h-auto w-6" />
                </a>
              </li>
              <li>
                <a href="https://web.telegram.org/a/">
                  <BsTelegram className="h-auto w-6" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-span-1 md:col-span-12">
          <div className="flex justify-center">
            <a href="/" className="text-dark-light">
              Copyright © 2023. Crafted with love.
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
