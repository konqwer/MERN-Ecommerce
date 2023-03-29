import React from 'react';

const ErrorPage = error => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <h1 className="text-xl font-semibold text-red-600">{error}</h1>
    </div>
  );
};

export default ErrorPage;
