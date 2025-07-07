import React from 'react';

function Logo({ width = '100px' }) {
  return (
    <div
      className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-teal-500"
      style={{ width }}
    >
      Selah
    </div>
  );
}

export default Logo;
