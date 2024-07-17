import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <img
          src="/loader.gif"
          alt="Loading..."
          className="w-20 h-20 mb-4"
        />
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

export default Loader;
