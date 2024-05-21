import React, { useState, useEffect } from "react";
import { useUser, headers } from "./components/Hooks";
import { useParams } from "react-router-dom";
import { supabase } from "../../../supabaseConfig";
import { useTheme } from "../../ThemeContext";
import MobileNav from "./components/MobileNav";

export const Profile = () => {
  const { userData } = useUser();
  const { username } = useParams();
  const [profilePic, setProfilePic] = useState("");
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (userData && userData[0]?.profile_pic) {
      setProfilePic(userData[0].profile_pic);
    }
  }, [userData]);

  const handleProfilePic = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const fileName = `${username}/${file.name}`;

    try {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("profile_pictures")
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: urlData, error: urlError } = supabase.storage
        .from("profile_pictures")
        .getPublicUrl(fileName);

      if (urlError) throw urlError;

      const filterParams = encodeURIComponent(JSON.stringify({ username }));
      const url = `https://us-east-2.aws.neurelo.com/rest/user_profiles?filter=${filterParams}`;

      const response = await fetch(url, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ profile_pic: urlData.publicUrl }),
      });

      if (!response.ok) throw new Error("Failed to update profile pic");

      setProfilePic(urlData.publicUrl);
    } catch (error) {
      console.error("Error handling profile picture: ", error.message);
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center w-full h-full p-5 ${
        theme === "light" ? "bg-white text-black" : "bg-[#16181c] text-white"
      }`}
    >
      <div className="md:hidden flex self-end">
        <MobileNav />
      </div>
      <div className="flex flex-col items-center w-full h-full justify-center p-5">
        <div className="flex flex-col items-center gap-10">
          <div className="flex flex-col items-center h-full w-full gap-5">
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePic}
              className="hidden"
              id="profilePicInput"
            />
            <img
              src={
                profilePic ||
                userData[0]?.profile_pic ||
                "default-profile-pic-url"
              }
              alt="profile-pic"
              className="w-40 h-40 rounded-full object-cover"
            />
            <button
              onClick={() => document.getElementById("profilePicInput").click()}
              className={`bottom-0 right-0 p-2 rounded-lg ${
                theme === "light" ? "bg-gray-200" : "bg-dark-lighter"
              }`}
            >
              {userData[0]?.profile_pic
                ? "Change Profile Picture"
                : "Upload Profile Picture"}
            </button>
          </div>
          <h1 className="text-3xl font-bold">{username}</h1>
          <p className="text-lg">{userData[0]?.full_name}</p>
        </div>
        <div className="flex flex-col items-center mt-8">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg ${
              theme === "light" ? "bg-gray-200" : "bg-dark-lighter"
            }`}
          >
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>
        </div>
      </div>
    </div>
  );
};
