import React, { useState } from "react";
import { Upload } from "antd";
import { UploadImageIcon } from "../../../Icons/UploadImageIcon";
import { XCircle } from "lucide-react";

const PdfJpegUploader = ({ value = [], onChange, disabled }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = ({ fileList: newFileList }) => {
    // Filter out files that are not PDF or JPEG
    const validFiles = newFileList.filter(file => {
      if (file.type) {
        return file.type === "application/pdf" || file.type.startsWith("image/jpeg");
      }
      return false;
    });

    // Combine new files with existing ones
    const updatedFileList = [...value, ...validFiles.map(file => ({
      uid: file.uid, // Preserve the uid for proper tracking
      file: file.originFileObj,
      fileName: file.name,
    }))];

    // Remove duplicates based on uid
    const uniqueFileList = [...new Set(updatedFileList.map(file => file.uid)).values()].map(uid => updatedFileList.find(file => file.uid === uid));

    onChange(uniqueFileList);
  };

  const handleRemove = (file, e) => {
    e.stopPropagation(); // Prevent triggering the upload dialog
    const newFileList = value.filter(f => f.uid !== file.uid);
    onChange(newFileList);
  };

  return (
    <div className="pdf-jpeg-uploader">
      <Upload
        accept=".pdf, .jpeg, .jpg"
        multiple
        fileList={value}
        onChange={handleChange}
        onRemove={handleRemove}
        beforeUpload={() => false} // Prevent automatic upload
        showUploadList={false} // Hide the default file list
        disabled={disabled}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
        onDrop={() => setIsDragging(false)}
      >
        {/* Drag and drop box with fixed width */}
        <div className={`flex flex-col items-center justify-start border-2 border-dashed ${isDragging ? 'border-blue-500' : 'border-gray-300'} rounded-lg p-6 transition-colors hover:bg-gray-100 cursor-pointer`}>
          {/* Upload icon and instructions */}
          <div className="w-full text-center mb-4">
            <UploadImageIcon className="text-black mb-2 mx-auto" />
            <div className="text-gray-600 text-sm">Click or drag to upload files</div>
          </div>

          {/* Display selected files in a horizontal layout */}
          {value.length > 0 && (
            <div className="w-full mt-4 flex flex-wrap gap-3">
              {value.map((file, index) => (
                <div key={file.uid} className="flex items-center justify-between bg-white py-2 px-4 rounded-full shadow-sm border border-gray-200">
                  <span className="text-gray-700 text-sm truncate max-w-32" title={file.fileName}>
                    {file.fileName}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => handleRemove(file, e)}
                    className="text-red-500 hover:text-red-700 focus:outline-none ml-2 flex-shrink-0"
                  >
                    <XCircle className="w-5 h-5 text-red-600" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </Upload>
    </div>
  );
};

export default PdfJpegUploader;