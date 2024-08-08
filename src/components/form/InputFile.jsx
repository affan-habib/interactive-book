import React from "react";
import { useField } from "formik";

const InputFile = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const isError = meta.touched && meta.error;
  return (
    <div>
      <label
        className="block text-gray-600 text-sm font-medium mb-2"
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <input
        className={`appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:-outline ${
          isError ? "border-red-500" : ""
        }`}
        type="file"
        onChange={(event) => {
          helpers.setValue(event.currentTarget.files[0]);
        }}
        onBlur={field.onBlur}
        name={field.name}
        id={field.name}
      />
      {isError && <span className="text-red-500 text-xs">{meta.error}</span>}
    </div>
  );
};

export default InputFile;
