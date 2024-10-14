import React, { forwardRef, useId } from "react";

const Input = forwardRef(
  ({ label, type = "text", className = "", ...props }, ref) => {
    const id = useId();
    return (
      <div className="w-full">
        {label && (
          <label className="block mb-1" htmlFor={props.id}>
            {label}
          </label>
        )}
        <input
          type={type}
          className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 ${className} `}
          {...props}
          ref={ref}
          id={id}
        />
      </div>
    );
  }
);

export default Input;
