import React from "react";

const Input = ({
  label = "",
  name = "",
  type = "text",
  className = "",
  isRequired = true,
  placeholder = "",
  value = "",
  onChange = () => {},
}) => {
  return (
    <div className="w-1/2">
      <label className="font-medium text-gray-800 black text-ssm">
        {label}
      </label>
      <input
        type={type}
        id={name}
        placeholder={placeholder}
        required={isRequired}
        value={value}
        onChange={onChange}
        className={`bg-gray-50 text-sm border border-gray-300 text-gray-900 t rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${className}`}
      ></input>
    </div>
  );
};
export default Input;
