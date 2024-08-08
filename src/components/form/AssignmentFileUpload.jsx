import React, { useState, forwardRef } from "react";
import { useField, useFormikContext } from "formik";
import Icon from "@/components/ui/Icon";
import AssignmentImageModal from "../../pages/course/assignment/AssignmentImageModal";

const getFileTypeIcon = (fileName) => {
  const extension = fileName.split('.').pop().toLowerCase();
  const iconMap = {
    pdf: "heroicons:document",
    doc: "heroicons:document-text",
    docx: "heroicons:document-text",
    zip: "heroicons:square-3-stack-3d",
  };

  return iconMap[extension] || iconMap.default;
};

const AssignmentFileUpload = forwardRef(({ name, label, required, accepts, placeholder, ...props }, ref) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedImagesUrls, setSelectedImagesUrls] = useState([]);
  const [open, setOpen] = useState(false);

  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const isError = meta.touched && meta.error;

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);

    // Extract image URLs
    const imageUrls = files
      .filter(file => file.type.startsWith("image/"))
      .map(file => URL.createObjectURL(file));
    setSelectedImagesUrls(imageUrls);
  };

  const removeFile = (index) => {
    setSelectedFiles(prevFiles => {
      const newFiles = [...prevFiles];
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
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
        {/* Input for file upload */}
        <input
          {...field}
          {...props}
          type="file"
          id={name}
          name={name}
          onChange={handleFileChange}
          onBlur={field.onBlur}
          accept=".doc,.pdf,.zip,image/*"
          multiple
          className={`absolute opacity-0 h-full w-full cursor-pointer`}
          ref={ref}
        />
        {/* File upload container */}
        <div className="border border-gray-400 rounded flex items-center justify-between py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:-outline bg-white">
          <span className="text-slate-400">{selectedFiles.length > 0 ? `${selectedFiles.length} file(s) selected` : placeholder}</span>
          <Icon icon="heroicons:arrow-up-tray" className="ml-2 w-5 h-5 text-gray-500" />
        </div>
      </div>
      {isError && <span className="text-red-500 text-xs">{meta.error}</span>}
      <div className="mt-3">
        {/* Render images */}
        {selectedFiles.some(file => file.type.startsWith("image/")) && (
          <div className="border border-slate-400 p-3 rounded-lg ">
            <div className="grid grid-cols-4">
              {selectedFiles.filter(file => file.type.startsWith("image/")).map((file, index) => (
                <div key={index} className="items-center relative">
                  <Icon icon={getFileTypeIcon(file.name)} className="mr-2" />
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Selected image ${index}`}
                    className="ml-2 w-24 cursor-pointer h-16"
                    onClick={() => openModal(URL.createObjectURL(file))} // Open modal on click
                  />
                  <div>
                    <span>{file.name}</span>
                    <span
                      className="absolute -top-4 right-6 mr-1 mt-1 w-4 h-4 cursor-pointer  text-red-500"
                      onClick={() => removeFile(index)} // Ensure this line is correctly calling removeFile
                    >
                      <Icon className="" width={24}
                        icon="material-symbols:cancel" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {open && (
          <AssignmentImageModal
            selectedImages={selectedImagesUrls}
            activeModal={open}
            handleClose={closeModal}
          />
        )}
        {/* Render documents (pdf, doc, docx, zip) */}
        {selectedFiles.some(file => !file.type.startsWith("image/")) && (
          <div className="border border-slate-400 p-3 rounded-lg mt-3 ">
            {selectedFiles.filter(file => !file.type.startsWith("image/")).map((file, index) => (
              <div key={index} className="flex items-center relative ">
                <Icon icon={getFileTypeIcon(file.name)} className="mr-2" />
                <span>{file.name}</span>
                <span
                  className="absolute top-0 right-0 mr-1 mt-1 w-4 h-4 cursor-pointer text-red-500"
                  onClick={() => removeFile(index)} // Ensure this line is correctly calling removeFile
                >
                  <Icon className="" width={24}
                        icon="material-symbols:cancel" />
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

export default AssignmentFileUpload;
