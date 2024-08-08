import React, { useState, forwardRef } from "react";
import { useField, useFormikContext } from "formik";
import api from "@/server/api";
import Icon from "@/components/ui/Icon";

const FileUpload = forwardRef(({ name, label, required, accepts, placeholder, ...props }, ref) => {
  const [selectedFileName, setSelectedFileName] = useState('');
  const [file, setSelectedFile] = useState('');

  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const isError = meta.touched && meta.error;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setSelectedFileName(selectedFile.name);

    const formData = new FormData();
    formData.append("file", selectedFile);

    api.filepost('/uploads', formData)
      .then(response => setFieldValue(name, response.data.data))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <label
        htmlFor={props.id || props.name}
        className="block text-gray-600 text-sm font-medium mb-2"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          {...field}
          {...props}
          type="file"
          id={name}
          name={name}
          value={file}
          onChange={handleFileChange}
          onBlur={field.onBlur}
          accept={accepts}
          className={`absolute opacity-0 h-full w-full cursor-pointer`}
          ref={ref}
        />
        <div className="border border-gray-400 rounded flex items-center justify-between py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:-outline bg-white">
          <span className="text-slate-400	">{selectedFileName || placeholder}</span>
          <Icon icon="heroicons:arrow-up-tray" className="ml-2 w-5 h-5 text-gray-500" />
        </div>
      </div>
      {isError && <span className="text-red-500 text-xs">{meta.error}</span>}
    </div>
  );
});

export default FileUpload;
