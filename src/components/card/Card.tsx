import React from 'react';
interface CardTtype {
  title: string;
  content: string;
  imgsrc: string;
}

const Card: React.FC<CardTtype> = ({ title, content, imgsrc }) => {
  return (
    <div className="flex flex-col justify-center items-center shadow-2xl rounded-xl px-8 py-5 flex-1 min-h-[40vh] bg-blue-700 text-white hover:scale-105 duration-300">
      <img src={imgsrc} alt={content} className="w-24 h-24" />
      <h1 className="mt-3 text-xl font-bold">{title}</h1>
      <p className="mt-3 text-center text-lg">{content}</p>
    </div>
  );
};

export default Card;
