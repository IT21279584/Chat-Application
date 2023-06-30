import React from "react";

const Button = ({ label = "", type = "", className = "", disable = false }) => {
  return (
    <div>
      <button
        className={`text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none 
        focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center ${className}`}
        type={type}
        disabled={disable}
      >
        {label}
      </button>
    </div>
  );
};

export default Button;
