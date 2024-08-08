import React, { useState } from "react";
import { useField } from "formik";
import { useDropzone } from "react-dropzone";
import { Icon } from "@iconify/react";

const DropzoneWithPreview = ({ name }) => {
  const [field, , helpers] = useField(name);
  const [showModal, setShowModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const Modal = ({ image, closeModal, navigateLeft, navigateRight }) => {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
        <div className="relative">
          <img
            src={image instanceof File ? URL.createObjectURL(image) : image}
            alt="Modal"
            className="w-[600px]"
          />
          <button
            className="absolute top-1/2 left-0 p-4"
            onClick={navigateLeft}
          >
            <Icon icon="heroicons:chevron-left" className="w-5 h-5" />
          </button>
          <button
            className="absolute top-1/2 right-0 p-4"
            onClick={navigateRight}
          >
            <Icon icon="heroicons:chevron-right" className="w-5 h-5" />
          </button>
          <button className="absolute top-0 right-0 p-4" onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    );
  };
  const onDrop = (acceptedFiles) => {
    // Update images state with newly uploaded files
    helpers.setValue([...field.value, ...acceptedFiles]);
  };

  const removeImage = (indexToRemove) => {
    helpers.setValue(field.value.filter((_, index) => index !== indexToRemove));
  };

  const openModal = (index) => {
    setSelectedImageIndex(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
    setShowModal(false);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: '.doc, .docx, .txt, .jpg, .jpeg, .png, .pdf, .ppt' });

  return (
    <div className="w-full bg-white">
      <div
        {...getRootProps()}
        className="h-32 border-dashed border-2 border-gray-400 flex justify-center items-center cursor-pointer"
      >
        <input {...getInputProps()} accept=".doc, .docx, .txt, .jpg, .jpeg, .png, .pdf, .ppt" />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <div className="flex flex-wrap mt-4">
        {field.value.map((image, index) => (
          <div key={index} className="w-full md:w-1/3 lg:w-1/4 p-2">
            <div className="relative" onClick={() => openModal(index)}>
              {image.type.startsWith('image/') ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Uploaded ${index}`}
                  className="w-full h-full object-cover cursor-pointer"
                />
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <Icon icon="mdi:file" className="w-10 h-10 text-gray-500" />
                  <p className="text-sm text-gray-500">{image.name}</p>
                </div>
              )}
              <button
                type="button"
                className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(index);
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <Modal
          image={field.value[selectedImageIndex]}
          closeModal={closeModal}
          navigateLeft={() =>
            setSelectedImageIndex(
              selectedImageIndex === 0
                ? field.value.length - 1
                : selectedImageIndex - 1
            )
          }
          navigateRight={() =>
            setSelectedImageIndex((selectedImageIndex + 1) % field.value.length)
          }
        />
      )}
    </div>
  );
};

export default DropzoneWithPreview;
