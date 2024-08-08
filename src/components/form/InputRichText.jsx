import React from "react";
import { useField } from "formik";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const InputRichText = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const isError = meta.touched && meta.error;

  return (
    <div>
      <label
        htmlFor={props.id || props.name}
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        {label}
      </label>
      <ReactQuill
        value={field.value || ""}
        className="h-[100px]"
        onChange={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        modules={{
          toolbar: [
            [{ header: "1" }, { header: "2" }],
            [{ size: [] }],
            // ["bold", "italic", "underline", "strike", "blockquote"],
            // [{ list: "ordered" }, { list: "bullet" }],
          ],
        }}
      />
      {isError && <span className="text-red-500 text-xs">{meta.error}</span>}
    </div>
  );
};

export default InputRichText;
