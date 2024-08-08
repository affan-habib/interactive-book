import React, { forwardRef } from "react";
import { useField } from "formik";

const InputField = forwardRef(({ label, required, type, isTextArea, rows, ...props }, ref) => {
  const [field, meta] = useField(props);
  const isError = meta.touched && meta.error;

  const inputClasses = `appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:-outline ${
    isError ? "border-red-500" : ""
  }`;

  return (
    <div>
      <label
        htmlFor={props.id || props.name}
        className="block text-gray-600 text-sm font-medium mb-2"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {isTextArea ? (
        <textarea
          {...field}
          {...props}
          className={inputClasses}
          ref={ref}
          rows={rows || 3}
        />
      ) : (
        <input
          {...field}
          {...props}
          type={type}
          className={inputClasses}
          ref={ref}
        />
      )}
      {isError && <span className="text-red-500 text-xs">{meta.error}</span>}
    </div>
  );
});

export default InputField;
