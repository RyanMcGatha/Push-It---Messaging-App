import React, { useState, useEffect } from "react";
import { supabase } from "../../../supabaseConfig";
import { useTheme } from "../../ThemeContext";

const Settings = ({ userData }) => {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [uploading, setUploading] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (userData) {
      setUsername(userData.username);
      setFullName(userData.full_name);
      setProfilePic(userData.profile_pic);
    }
  }, [userData]);

  const handleProfilePicUpload = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setUploading(true);

    const fileExt = file.name.split(".").pop();
    const fileName = `${username}.${fileExt}`;
    const filePath = `${fileName}`;

    let { error: uploadError } = await supabase.storage
      .from("profile_pictures")
      .upload(filePath, file);

    if (uploadError) {
      console.error("Upload error:", uploadError.message);
      setUploading(false);
      return;
    }

    const { publicURL, error: urlError } = supabase.storage
      .from("profile_pictures")
      .getPublicUrl(filePath);

    if (urlError) {
      console.error("URL error:", urlError.message);
      setUploading(false);
      return;
    }

    setProfilePic(publicURL);

    const { data, error: updateError } = await supabase
      .from("profiles")
      .update({ profile_pic: publicURL })
      .eq("username", username);

    if (updateError) {
      console.error("Update error:", updateError.message);
      setUploading(false);
      return;
    }

    setUploading(false);
  };

  const handleUpdateProfile = async () => {
    const updates = {
      username,
      full_name: fullName,
      profile_pic: profilePic,
    };

    const { error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("username", userData.username);

    if (error) {
      console.error("Update error:", error.message);
    } else {
      alert("Profile updated successfully!");
    }
  };

  return (
    <div
      className={`flex flex-col p-4 ${
        theme === "light" ? "bg-white" : "bg-dark text-white"
      }`}
    >
      <h2 className="text-xl font-semibold mb-4">Settings</h2>
      <div className="mb-4">
        <label className="block text-sm mb-2">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={`p-2 border ${
            theme === "light"
              ? "border-gray-300 bg-white"
              : "border-dark-lighter bg-dark-lighter"
          } rounded-lg w-full`}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-2">Full Name</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className={`p-2 border ${
            theme === "light"
              ? "border-gray-300 bg-white"
              : "border-dark-lighter bg-dark-lighter"
          } rounded-lg w-full`}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-2">Profile Picture</label>
        <input
          type="file"
          onChange={handleProfilePicUpload}
          className="p-2 border border-gray-300 rounded-lg w-full"
          disabled={uploading}
        />
        {profilePic && (
          <img
            src={profilePic}
            alt="Profile"
            className="mt-4 w-20 h-20 rounded-full"
          />
        )}
      </div>
      <button
        onClick={handleUpdateProfile}
        className={`p-2 ${
          theme === "light"
            ? "bg-blue-500 text-white"
            : "bg-blue-700 text-white"
        } rounded-lg`}
      >
        Update Profile
      </button>
      <button
        onClick={toggleTheme}
        className={`mt-4 p-2 ${
          theme === "light" ? "bg-gray-200" : "bg-dark-lighter"
        } rounded-lg`}
      >
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </button>
    </div>
  );
};

export default Settings;
