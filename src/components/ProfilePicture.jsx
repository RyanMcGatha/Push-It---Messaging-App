import React, { useRef } from "react";

const ProfilePicture = ({ src, alt, onUpdate, isUploading }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onUpdate(file);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <img
        src={src || "/default-profile-pic.png"}
        alt={alt}
        className="w-40 h-40 rounded-full object-cover"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        ref={fileInputRef}
      />
      <button
        onClick={() => fileInputRef.current.click()}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        disabled={isUploading}
      >
        {isUploading ? "Uploading..." : "Change Profile Picture"}
      </button>
    </div>
  );
};

export default ProfilePicture;
