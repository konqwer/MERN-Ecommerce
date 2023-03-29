import React from 'react';

const Image = ({ src, className }) => {
  return (
    <div
      className={`flex aspect-square items-center justify-center bg-slate-200 ${className}`}
    >
      <img className="max-h-full" src={`http://localhost:4000/images/` + src} />
    </div>
  );
};

export default Image;
