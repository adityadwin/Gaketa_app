import React from "react";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaTelegram,
  FaWhatsappSquare,
} from "react-icons/fa";

const SocialShareButtons = ({ url, title }) => {
  return (
    <div className="flex w-full justify-between">
      <a target="_blank" rel="noreferrer" href={`https://www.facebook.com/`}>
        <FaFacebookSquare className="h-auto w-12 text-[#3b5998]" />
      </a>
      <a target="_blank" rel="noreferrer" href={`https://www.instagram.com/`}>
        <FaInstagramSquare className="h-auto w-12 text-[#FF5580]" />
      </a>
      <a target="_blank" rel="noreferrer" href={`https://api.whatsapp.com`}>
        <FaWhatsappSquare className="h-auto w-12 text-[#25D366]" />
      </a>
      <a target="_blank" rel="noreferrer" href={`https://web.telegram.org/`}>
        <FaTelegram className="h-auto w-12 text-[#5AB2FF]" />
      </a>
    </div>
  );
};

export default SocialShareButtons;
