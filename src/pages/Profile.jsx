import React, { useState, useEffect, useCallback } from "react";
import { useUserProfile } from "../hooks/useUserProfile";
import { useParams } from "react-router-dom";
import { supabase } from "../../supabaseConfig";
import { useTheme } from "../contexts/ThemeContext";
import MobileNav from "../components/MobileNav";
import ProfilePicture from "../components/ProfilePicture";
import ThemeToggle from "../components/ThemeToggle";
import { toast } from "react-toastify";

export const Profile = () => {
  const { userData, isLoading: userDataLoading } = useUserProfile();
  const [profilePic, setProfilePic] = useState("");
  const { theme } = useTheme();
  const { username } = useParams();
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (userData) {
      setProfilePic(userData.profile_pic);
    }
  }, [userData]);

  const handleProfilePicUpdate = useCallback(
    async (file) => {
      if (!file) return;

      setIsUploading(true);
      const fileName = `${username}/${file.name}`;

      try {
        const { error: uploadError } = await supabase.storage
          .from("profile_pictures")
          .upload(fileName, file, { upsert: true });

        if (uploadError) throw uploadError;

        const { data: urlData, error: urlError } = supabase.storage
          .from("profile_pictures")
          .getPublicUrl(fileName);

        if (urlError) throw urlError;

        const response = await fetch(
          "https://push-it-backend.vercel.app/profile-pic",
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, profilePic: urlData.publicUrl }),
          }
        );

        if (!response.ok) throw new Error("Failed to update profile pic");

        setProfilePic(urlData.publicUrl);
        toast.success("Profile picture updated successfully!");
      } catch (error) {
        console.error("Error handling profile picture: ", error.message);
        toast.error("Failed to update profile picture. Please try again.");
      } finally {
        setIsUploading(false);
      }
    },
    [username]
  );

  if (userDataLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col min-h-screen ${
        theme === "light" ? "bg-white text-black" : "bg-[#16181c] text-white"
      }`}
    >
      <header className="p-4">
        <div className="md:hidden flex justify-end">
          <MobileNav />
        </div>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center p-5">
        <ProfilePicture
          src={profilePic}
          alt={`${userData.username}'s profile picture`}
          onUpdate={handleProfilePicUpdate}
          isUploading={isUploading}
        />
        <h1 className="text-3xl font-bold capitalize mt-6">
          {userData.username}
        </h1>
        <p className="text-lg mt-2">{userData.full_name}</p>
        <div className="mt-8">
          <ThemeToggle />
        </div>
      </main>
    </div>
  );
};

export default Profile;
