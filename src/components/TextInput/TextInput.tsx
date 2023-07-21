import React from "react";

interface TextInputProps {
  label: string;
  id: string;
  error?: string;
  register: any;
  className?: string;
  type?: "password" | "email" | "text";
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  id,
  error,
  register,
  className = "",
  type = "text",
}) => {
  return (
    <div className={`mb-2 ${className}`}>
      <label htmlFor={id} className="block mb-2">
        {label}
      </label>
      <input
        type={type}
        id={id}
        {...register(id, { required: `${label} is required.` })}
        className="w-full p-2 border rounded-lg border-black focus:border-blue-500 !important"
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default TextInput;
