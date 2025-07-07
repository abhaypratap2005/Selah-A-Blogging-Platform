import React from 'react';

function Button({
  children,
  type = 'button',
  bgColor = 'bg-blue-600',
  textColor = 'text-white',
  className = '',
  ...props
}) {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}
      {...props} // ✅ forward all additional props like onClick, disabled, etc.
    >
      {children}
    </button>
  );
}

export default Button;
