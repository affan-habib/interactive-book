// FileInput.jsx

import React, { useCallback, useState, useRef } from 'react';
import AvatarEditor from 'react-avatar-editor';
import Modal from "@/components/ui/Modal";
import { useTranslation } from 'react-i18next';

const FileInput = ({ label, name, limit, height = 250, width = 250 }) => {
  const { t } = useTranslation()
  const [image, setImage] = useState(null);
  const [scale, setScale] = useState(1);
  const editorRef = useRef(null);
  const [cropModal, setOpenModal] = useState(false);

  const handleFileChange = useCallback(
    (e) => {
      const file = e.target.files?.[0];

      if (file) {
        setImage(file);
        setOpenModal(true);
      }
    },
    [],
  );

  const handleScaleChange = useCallback(
    (e) => {
      setScale(parseFloat(e.target.value));
    },
    [],
  );

  const handleCropSubmit = () => {
    if (editorRef.current) {
      const canvasScaled = editorRef.current.getImageScaledToCanvas();

      canvasScaled.toBlob((blob) => {
        if (blob) {
          // Handle the blob as needed
        }
      }, 'image/jpeg');
    }

    setOpenModal(false);
  };

  return (
    <div>
      <label className="block text-black font-semibold my-1" htmlFor={name}>
        {label}
      </label>
      <input
        className="w-full border border-gray-300 p-2 mb-2"
        id={name}
        name={name}
        type="file"
        onChange={handleFileChange}
        accept="image/*"
      />
      {limit && <span className="text-gray-600 text-sm">{limit}</span>}
      {image && (
        <Modal
          title={t("image.resize")}
          labelclassName="btn-outline-dark"
          activeModal={cropModal}
          onClose={() => setOpenModal(false)}
        >
          <div className="flex flex-col items-center">
            <AvatarEditor
              ref={(ref) => {
                if (ref) {
                  editorRef.current = ref;
                }
              }}
              image={image}
              width={width}
              height={height}
              border={50}
              scale={scale}
            />
          </div>
          <div>
            <label className="block">{t('scale')}:</label>
            <input
              className="w-full"
              type="range"
              min="1"
              max="2"
              step="0.01"
              value={scale}
              onChange={handleScaleChange}
            />
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 mt-2" onClick={handleCropSubmit}>
            {t('image.crop')}
          </button>

        </Modal>
      )}
    </div>
  );
};

export default FileInput;
