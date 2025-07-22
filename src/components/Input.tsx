"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";

interface InputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  placeholder?: string;
  error?: string;
  textarea?: boolean;
  selectOptions?: string[];
  min?: string;
}

/**
 *
 * @param param0 - Component properties.
 * @param {string} param0.label - Label for the input field.
 * @param {string} param0.name - Name attribute for the input field.
 * @param {string} [param0.type="text"] - Type of the input field.
 * @returns JSX.Element
 */
const Input: React.FC<InputProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  textarea = false,
  selectOptions,
  min,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;
  return (
    <div className="w-full mb-4">
      <label htmlFor={name} className="block text-sm font-medium mb-1">
        {label}
      </label>

      {textarea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:black"
          rows={4}
        />
      ) : selectOptions ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:black"
        >
          <option value="">Select {label}</option>
          {selectOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <div className="relative">
          <input
            id={name}
            name={name}
            type={inputType}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={clsx(
              "w-full border rounded-md p-2 pr-10 focus:outline-none focus:ring-2 focus:black 500",
              error && "border-red-500",
            )}
            min={min}
          />

          {isPassword && (
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          )}
        </div>
      )}

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Input;
