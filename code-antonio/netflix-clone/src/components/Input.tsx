import React from "react";

type InputProps = {
  id: string;
  type?: string;
  label: string;
  value: string;
  onChange: any;
};

const Input = ({ id, type, label, value, onChange }: InputProps) => {
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className="
          w-full bg-neutral-700
          text-base text-white
          px-6 pt-6 pb-1
          appearance-none focus:outline-none focus:ring-0
          peer invalid:border-b-1
        "
        placeholder=" "
      />
      <label
        htmlFor={id}
        className="
          absolute
          top-3 left-6 -translate-y-3 origin-[0]
          text-base text-zinc-400
          z-10
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75 peer-focus:-translate-y-3
          transition-all duration-300 ease-in-out
        "
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
