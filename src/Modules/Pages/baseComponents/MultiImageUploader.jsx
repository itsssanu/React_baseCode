import React, { useState, useEffect, useRef } from 'react';
import { Upload, Button, message } from 'antd';
import { CloseCircleOutlined, FileOutlined, FilePdfOutlined, FileWordOutlined } from '@ant-design/icons';
import { UploadImageIcon } from '../../../Icons/UploadImageIcon';
import { useSelector } from 'react-redux';

const MultiImageUploader = ({ value, onChange, onRemove, disabled, submitLoading }) => {
  const [fileList, setFileList] = useState([]);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const previewsRef = useRef({});
  
  // Initialize file list from value prop
  useEffect(() => {
    if (value && value.length > 0) {
      const initialFileList = value.map((file, index) => {
        const fileType = file.type || getFileTypeFromName(file.filename);
        const isImage = fileType && fileType.startsWith('image/');
        
        // Create a static preview URL for stored files
        let displayUrl;
        if (file.gcs_path) {
          displayUrl = `https://trackvantaimages.s3.us-east-1.amazonaws.com/${file.gcs_path}`;
        } else if (file.originFileObj && isImage) {
          // For new uploads, create and store object URL in the ref
          if (!previewsRef.current[file.filename]) {
            previewsRef.current[file.filename] = URL.createObjectURL(file.originFileObj);
          }
          displayUrl = previewsRef.current[file.filename];
        }
        
        return {
          uid: `existing-${index}`,
          name: file.filename || `file-${index}`,
          status: 'done',
          url: file.gcs_path ? `https://trackvantaimages.s3.us-east-1.amazonaws.com/${file.gcs_path}` : undefined,
          gcs_path: file.gcs_path,
          originFileObj: file.originFileObj || null,
          filename: file.filename,
          displayUrl: displayUrl,
          type: fileType,
          thumbUrl: isImage ? displayUrl : undefined,
        };
      });
      
      setFileList(initialFileList);
    } else {
      setFileList([]);
    }
  }, [value]);

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      Object.values(previewsRef.current).forEach(url => {
        URL.revokeObjectURL(url);
      });
      previewsRef.current = {};
    };
  }, []);

  const getFileTypeFromName = (filename) => {
    if (!filename) return '';
    const extension = filename.split('.').pop().toLowerCase();
    if (['png', 'jpg', 'jpeg'].includes(extension)) {
      return `image/${extension}`;
    } else if (extension === 'pdf') {
      return 'application/pdf';
    } else if (extension === 'doc') {
      return 'application/msword';
    } else if (extension === 'docx') {
      return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    }
    return '';
  };
  
  const handleFileChange = ({ fileList: newFileList }) => {
    const updatedFileList = newFileList.map((file) => {
      if (file.originFileObj) {
        const fileType = file.type || getFileTypeFromName(file.name);
        const isImage = fileType && fileType.startsWith('image/');
        
        // Create or reuse object URL for this file
        if (isImage && !previewsRef.current[file.name]) {
          previewsRef.current[file.name] = URL.createObjectURL(file.originFileObj);
        }
        
        if (isImage) {
          file.displayUrl = previewsRef.current[file.name];
          file.thumbUrl = previewsRef.current[file.name];
        }
        
        file.type = fileType;
      }
      return file;
    });
  
    setFileList(updatedFileList);
    if (onChange) {
      const transformedFiles = updatedFileList.map((file) => ({
        filename: file.name,
        gcs_path: file.gcs_path,
        originFileObj: file.originFileObj,
        type: file.type || getFileTypeFromName(file.name),
        // Don't pass the URL directly as it may be revoked
      }));
      onChange(transformedFiles);
    }
  };
  
  const handleRemove = (file) => {
    if (disabled) return;
  
    // Update fileList state
    const updatedFileList = fileList.filter((item) => item.uid !== file.uid);
    setFileList(updatedFileList);
  
    // Clean up the preview URL
    if (previewsRef.current[file.name]) {
      URL.revokeObjectURL(previewsRef.current[file.name]);
      delete previewsRef.current[file.name];
    }
    
    // Transform files for onChange callback
    const transformedFiles = updatedFileList.map((file) => ({
      filename: file.name,
      gcs_path: file.gcs_path,
      originFileObj: file.originFileObj,
      type: file.type,
    }));
  
    // Call onChange with the transformed files
    if (onChange) {
      onChange(transformedFiles);
    }
  
    // Call onRemove to let parent component handle backend-specific logic
    if (onRemove) {
      onRemove(file);
    }
  };

  const handleFileClick = (file) => {
    // Only handle clicks for document files
    if (!isImageFile(file.type)) {
      const fileUrl = file.displayUrl || file.url;
      if (fileUrl) {
        window.open(fileUrl, '_blank');
      }
    }
  };
  
  const validateFile = (file) => {
    const allowedTypes = [
      'image/png', 
      'image/jpg', 
      'image/jpeg', 
      'application/pdf', 
      'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    // Check file extension if MIME type is not recognized
    if (!allowedTypes.includes(file.type)) {
      const extension = file.name.split('.').pop().toLowerCase();
      const allowedExtensions = ['png', 'jpg', 'jpeg', 'pdf', 'doc', 'docx'];
      if (!allowedExtensions.includes(extension)) {
        message.error('You can only upload PNG, JPG, JPEG, PDF, DOC, or DOCX files!');
        return false;
      }
    }

    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('File must be smaller than 5MB!');
      return false;
    }
    return true;
  };

  const isOversized = (file) => {
    return file.originFileObj && file.originFileObj.size / 1024 / 1024 >= 2;
  };

  const getFileIcon = (fileType) => {
    if (fileType && fileType.startsWith('image/')) {
      return null;
    }
    
    if (fileType === 'application/pdf') {
      return <FilePdfOutlined style={{ fontSize: '36px', color: '#e84118' }} />;
    } else if (fileType === 'application/msword' || 
              fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      return <FileWordOutlined style={{ fontSize: '36px', color: '#0078d7' }} />;
    }
    
    return <FileOutlined style={{ fontSize: '36px', color: '#7f8fa6' }} />;
  };

  const getFileSize = (file) => {
    if (file.size) {
      const sizeInKB = (file.size / 1024).toFixed(2);
      return `${sizeInKB} KB`;
    }
    return '';
  };
  
  const isImageFile = (fileType) => {
    return fileType && fileType.startsWith('image/');
  };

  const getFileTypeName = (fileType) => {
    if (fileType === 'application/pdf') {
      return 'PDF';
    } else if (fileType === 'application/msword') {
      return 'DOC';
    } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      return 'DOCX';
    }
    return '';
  };

  // Default image placeholder
  const imagePlaceholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%23cccccc' d='M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z'/%3E%3C/svg%3E";

  return (
    <div className="flex flex-wrap gap-1 mt-2">
      {fileList.map((file) => (
        <div
          key={file.uid}
          className={`relative w-62 h-48 rounded-lg overflow-hidden mb-4 border-2 ${
            isOversized(file) ? 'border-red-600' : 'border-gray-300'
          }`}
        >
          {isImageFile(file.type) ? (
            <div className="w-full h-full bg-gray-100">
              <img
                src={file.displayUrl || file.thumbUrl || file.url || imagePlaceholder}
                alt={file.name || 'preview'}
                className="w-full h-full object-contain"
                onError={(e) => {
                  console.error("Image failed to load:", file);
                  e.target.src = imagePlaceholder;
                }}
              />
            </div>
          ) : (
            <div 
              className="w-full h-full flex flex-col items-center justify-center bg-gray-50 cursor-pointer"
              onClick={() => handleFileClick(file)}
              title={`Click to open ${file.name}`}
            >
              <div className="flex flex-col items-center justify-center">
                {getFileIcon(file.type)}
                <div className="text-center mt-4">
                  <div className="font-medium text-gray-800 truncate max-w-full px-4">
                    {file.name}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {getFileSize(file) || getFileTypeName(file.type)}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {!submitLoading && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(file);
              }}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full border-none flex items-center justify-center cursor-pointer z-10"
            >
              <CloseCircleOutlined style={{ fontSize: '18px' }}/>
            </button>
          )}
        </div>
      ))}

      <Upload
        accept=".png,.jpg,.jpeg,.pdf,.doc,.docx"
        multiple
        showUploadList={false}
        fileList={fileList}
        disabled={submitLoading}
        onChange={handleFileChange}
        beforeUpload={(file) => {
          const valid = validateFile(file);
          if (!valid) {
            return false;
          }
          return false; // Return false to prevent auto upload
        }}
      >
        <div className={`w-62 h-48 border-2 border-dashed ${darkMode ? 'border-gray-600 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-100'} rounded-lg flex flex-col items-center justify-center cursor-pointer`}>
          <UploadImageIcon darkMode={darkMode} className={`text-xl mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
          <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t('uploadFiles')}</span>
        </div>
      </Upload>
    </div>
  );
};

export default MultiImageUploader;