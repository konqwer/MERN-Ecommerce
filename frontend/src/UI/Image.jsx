import React from 'react';

const Image = ({ src, className }) => {
  return (
    <div className={`relative bg-slate-200 pt-[100%] ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <img src={`http://localhost:4000/images/` + src} />
      </div>
    </div>
  );
};

export default Image;
