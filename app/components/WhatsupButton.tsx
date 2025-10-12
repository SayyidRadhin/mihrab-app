import Image from 'next/image';
import React from 'react';

const WhatsupButton: React.FC = () => {
  return (
	  <a
        href="https://wa.me/918891296161" // CHANGE THIS TO YOUR ADMIN WHATSAPP NUMBER
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 bg-emerald-600 text-white py-4 px-5 opacity- rounded-full shadow-lg hover:bg-slate-600 transition flex items-center"
      >
        <Image
          src="/whatsapp.svg" // Replace with your Flaticon WhatsApp icon
          alt="WhatsApp"
          width={20}
          height={20}
          className=" text-white"
        />
      </a>
  );
};

export default WhatsupButton;

  
