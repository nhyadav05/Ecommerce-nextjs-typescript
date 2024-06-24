import React from 'react';

const Loader = () => {
  return (
    <div>
      <div className="flex justify-center items-center min-h-screen ">
          <img
              src="/loader.gif"
              alt="Loading..."
              className="w-[80px] h-[80px]"
            />
            <span>
              <text>Loading...</text>
            </span>
          </div>
    </div>
  );
}

export default Loader;
