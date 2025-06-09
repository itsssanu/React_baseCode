import React, { useRef, useState, useEffect } from 'react';
import { Pencil, Trash2, XCircle } from 'lucide-react';
import { UploadImageIcon } from '../../../Icons/UploadImageIcon';
import { ProfileLogo } from './/ProfileLogo';


const LogoImageUploader = ({
  value,
  onChange,
  disabled = false,
  className = '',
  onRemove,
  type = 'logo',
  tenant_id,
  getAccountSummaryList,
}) => {
  const [fileList, setFileList] = useState(
    Array.isArray(value)
      ? value.map((image, index) => ({
        uid: `existing-${index}`,
        name: image.filename || `image-${index}`,
        status: 'done',
        url: `https://storage.googleapis.com/accostay-images/${image.gcs_path}`,
        gcs_path: image.gcs_path,
        originFileObj: null,
        filename: image.filename,
      }))
      : []
  );

  const fileInputRef = useRef(null);

  const { profileImageLoading } = useSelector((state) => state?.userManagementState);

  useEffect(() => {
    if (Array.isArray(value) && value.length > 0) {
      setFileList(
        value.map((image, index) => ({
          uid: `existing-${index}`,
          name: image.filename || `image-${index}`,
          status: 'done',
          url: `https://storage.googleapis.com/accostay-images/${image.gcs_path}`,
          gcs_path: image.gcs_path,
          originFileObj: null,
          filename: image.filename,
        }))
      );
    } else if (value?.originFileObj instanceof File) {
      const previewUrl = URL.createObjectURL(value.originFileObj);
      setFileList([{
        uid: `rc-upload-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        name: value.filename,
        status: 'done',
        url: previewUrl,
        gcs_path: undefined,
        originFileObj: value.originFileObj,
        filename: value.filename,
      }]);
      return () => URL.revokeObjectURL(previewUrl);
    }
  }, [value]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formattedFile = {
        uid: `rc-upload-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        name: file.name,
        status: 'done',
        url: URL.createObjectURL(file),
        gcs_path: undefined,
        originFileObj: file,
        filename: file.name,
      };

      setFileList([formattedFile]);
      onChange(formattedFile);

      if (tenant_id && type === 'profile_image') {

        const formData = new FormData();
        formData.append("images", file);
        const accessToken = localStorage.getItem('access_token');


        const imageUploadUrl = `upload_images_GCP?key=tenant&id=${tenant_id}`;
        const imageUploadHeaders = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        };

        try {
          const response = await axios.post(imageUploadUrl, formData, {
            headers: imageUploadHeaders,
          });

          if (response.status === 200) {
            showToastSuccess("Tenant Image added successfully");
          }
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      }
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemove = (e, removedFile) => {
    e.stopPropagation();
    e.preventDefault();

    const updatedFileList = fileList.filter((file) => file.uid !== removedFile.uid);
    setFileList(updatedFileList);

    if (onChange) {
      const transformedFiles = updatedFileList.map((file) => ({
        filename: file.name,
        gcs_path: file.gcs_path,
        originFileObj: file.originFileObj,
      }));
      onChange(transformedFiles);
    }

    if (onRemove) {
      onRemove(removedFile);
    }

    if (removedFile.preview) {
      URL.revokeObjectURL(removedFile.preview);
    }
  };

  const preview = fileList[0]?.url;

  const containerClass = type === 'profile_image'
    ? 'w-30 h-30 rounded-full'
    : 'w-64 h-48 rounded-lg';

  const imageClass = type === 'profile_image'
    ? 'rounded-full object-cover'
    : 'rounded-lg object-contain';

  return (
    <div
      onClick={() => !disabled && fileInputRef.current.click()}
      className={`relative border-dashed border-2 border-gray-300 p-2
        flex items-center justify-center flex-col hover:bg-gray-100
        ${!disabled ? 'cursor-pointer' : 'opacity-75 cursor-not-allowed'}
        ${containerClass} ${className}`}
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
        <div className="relative w-full h-full group">
          {profileImageLoading ? (
            <div className="w-30 h-30 rounded-full flex items-center justify-center overflow-hidden">
              {/* <div className="w-full h-full relative"> */}
                <Skeleton.Image
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: 0,
                    left: 0
                  }}
                  active
                />
              {/* </div> */}
            </div>
          ) : (
            <img src={preview} alt="Preview" className={`w-full h-full ${imageClass}`} />
          )}

          {!disabled && type === 'logo' && (
            <button
              onClick={(e) => handleRemove(e, fileList[0])}
              className="absolute -top-3 -right-3 p-1 rounded-full bg-red-500 shadow-md"
            >
              <XCircle className="w-6 h-6 text-white" />
            </button>
          )}

          {!disabled && type === 'profile_image' && !tenant_id && (
            <button
              onClick={(e) => handleRemove(e, fileList[0])}
              className="absolute -top-3 -right-3 p-1 rounded-full bg-red-500 shadow-md"
            >
              <XCircle className="w-6 h-6 text-white" />
            </button>
          )}

          {!disabled && type === 'profile_image' && tenant_id && (
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={(e) => handleRemove(e, fileList[0])}
                className="absolute left-4 p-1 rounded-md bg-red-500 shadow-md"
              >
                <Trash2 className="w-4 h-4 text-white" />
              </button>
              <button
                onClick={(e) => handleImageChange(e, fileList[0])}
                className="absolute right-4 rounded-md p-1 shadow-md bg-primary"
              >
                <Pencil className="w-4 h-4 text-white" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>
          {type !== 'profile_image' ? (
            <div className="flex flex-col items-center">
              <UploadImageIcon className="mb-2" />
              <div className="text-center text-sm text-gray-500">
                <span>Upload image</span>
              </div>
            </div>
          ) : tenant_id ? (
            profileImageLoading ? (
            <div className="w-30 h-30 rounded-full flex items-center justify-center overflow-hidden">
            {/* <div className="w-full h-full relative"> */}
              <Skeleton.Image
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: 0,
                  left: 0
                }}
                active
              />
            {/* </div> */}
          </div>) : 
            <ProfileLogo
              type="profile-image"
              name={`${getAccountSummaryList?.first_name?.[0] || ''}${getAccountSummaryList?.last_name?.[0] || ''}`}
              className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary text-2xl font-bold text-white shadow-md flex items-center justify-center"
            />
          ) : (
            <div className="flex flex-col items-center">
              <UploadImageIcon className="mb-2" />
              <div className="text-center text-sm text-gray-500">
                <span>Upload image</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LogoImageUploader;
