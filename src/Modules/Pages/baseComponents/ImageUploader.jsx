import React, { useState } from 'react';
import { UploadImageIcon } from '../../../Icons/UploadImageIcon';

const ImageUploader = ({ name, className, onFileUpload }) => {
  const [fileName, setFileName] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null); // State for image preview

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setPreviewUrl(URL.createObjectURL(file)); // Generate a preview URL
      onFileUpload(file);
    }
  };

  const handleUploadClick = () => {
    document.getElementById('upload_input').click();
  };

  return (
    <div className={`w-full h-auto border-dashed border-2 border-[#BEBEBE] rounded-xl p-4 flex flex-col items-center ${className}`}>
      {previewUrl ? (
        <div className="w-full flex flex-col items-center">
          <img
            src={previewUrl}
            alt="Uploaded preview"
            className="w-[10.5rem] h-[10.5rem] object-cover rounded-lg mb-4"
          />
          <button
                className="bg-purple-500 text-[16px] text-white rounded-xl h-8 px-3 border-none hover:bg-purple-700"
                onClick={handleUploadClick}
          >
            Change Image
          </button>
        </div>
      ) : (
        <div
          className="w-full h-52 flex flex-col items-center justify-center cursor-pointer"
          onClick={handleUploadClick}
        >
          <div className="mb-4">
            <UploadImageIcon />
          </div>
          <span className="text-center text-gray-600">{fileName || 'Upload image'}</span>
        </div>
      )}
      <input
        type="file"
        id="upload_input"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ImageUploader;
