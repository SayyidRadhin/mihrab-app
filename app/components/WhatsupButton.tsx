import Image from 'next/image';
import React from 'react';

const WhatsupButton: React.FC = () => {
  return (
	  <a
        href="https://wa.me/1234567890" // CHANGE THIS TO YOUR ADMIN WHATSAPP NUMBER
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-primaryAccent text-white p-4 rounded-full shadow-lg hover:bg-slate-600 transition flex items-center"
      >
        <Image
          src="/whatsapp.svg" // Replace with your Flaticon WhatsApp icon
          alt="WhatsApp"
          width={25}
          height={25}
          className=" text-white"
        />
      </a>
  );
};

export default WhatsupButton;

  
