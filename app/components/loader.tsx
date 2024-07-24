import React from 'react';

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="flex flex-col items-center">
        <img
          src="/loader.gif"
          alt="Loading..."
          className="w-20 h-20 mb-2 animate-spin"
        />
        <span className="text-white text-lg">Loading...</span>
      </div>
    </div>
  );
}

export default Loader;

