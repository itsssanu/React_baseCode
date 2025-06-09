import React, { useRef, useState } from 'react';
import { XCircle } from 'lucide-react';
import { UploadImageIcon } from '../../../Icons/UploadImageIcon';

const SingleImageUploader = ({
  value,
  onChange,
  disabled = false,
  className = '',
}) => {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  // Update preview when value changes
  React.useEffect(() => {
    if (value?.file instanceof File) {
      const previewUrl = URL.createObjectURL(value.file);
      setPreview(previewUrl);
      return () => URL.revokeObjectURL(previewUrl);
    } else {
      setPreview(null);
    }
  }, [value]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Send both file and filename
      onChange({
        file: file,
        fileName: file.name
      });
    }
    // Reset the file input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    e.preventDefault(); // Prevent default behavior
    onChange(null);
    // Reset the file input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div
      onClick={() => !disabled && fileInputRef.current.click()}
      className={`relative w-64 h-48 border-dashed border-2 border-gray-300 rounded-lg p-2
        flex items-center justify-center flex-col hover:bg-gray-100
        ${!disabled ? 'cursor-pointer' : 'opacity-75 cursor-not-allowed'}
        ${className}`}
    >
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        disabled={disabled}
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />

      {preview ? (
        <div className="relative w-full h-full">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-contain rounded-lg"
          />
          {!disabled && (
            <button
              onClick={handleRemove}
              className="absolute -top-3 -right-3 p-1 rounded-full bg-red-500 shadow-md "
            >
              <XCircle className="w-6 h-6 text-white" />
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="mb-2">
            <UploadImageIcon />
          </div>
          <div className="text-center text-gray-500">
            <span>Upload image</span>
          </div>
        </>
      )}
    </div>
  );
};


export default SingleImageUploader;
