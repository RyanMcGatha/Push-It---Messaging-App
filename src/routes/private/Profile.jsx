import React, { useState, useEffect } from "react";
import { useUser, headers } from "./components/Hooks";
import { useParams } from "react-router-dom";
import { supabase } from "../../../supabaseConfig";

export const Profile = () => {
  const { userData } = useUser();
  const { username } = useParams();
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    // Set the initial profile picture when the component mounts or userData changes
    if (userData && userData[0]?.profile_pic) {
      setProfilePic(userData[0].profile_pic);
    }
  }, [userData]);

  const handleProfilePic = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const fileName = file.name;

    try {
      // Upload the new profile picture with the original file name
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("profile_pictures")
        .upload(`${username}/${fileName}`, file, {
          upsert: false,
        });
      if (uploadError) throw uploadError;

      // Get the public URL of the new profile picture
      const { data: urlData, error: urlError } = supabase.storage
        .from("profile_pictures")
        .getPublicUrl(`${username}/${fileName}`);
      if (urlError) throw urlError;

      // Update the user's profile picture URL in the database
      const filterParams = encodeURIComponent(JSON.stringify({ username }));
      const url = `https://us-east-2.aws.neurelo.com/rest/user_profiles?filter=${filterParams}`;

      const response = await fetch(url, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ profile_pic: urlData.publicUrl }),
      });
      if (!response.ok) throw new Error("Failed to update profile pic");

      const result = await response.json();

      // Update the profilePic state to trigger a UI update
      setProfilePic(urlData.publicUrl);
    } catch (error) {
      console.error("Error handling profile picture: ", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-[#16181c] text-white">
      <div className="flex flex-col items-center w-full p-5">
        <div className="flex flex-col items-center gap-5">
          <input type="file" accept="image/*" onChange={handleProfilePic} />
          <img
            src={profilePic || userData[0]?.profile_pic}
            alt="profile-pic"
            className="w-40 h-40 rounded-full"
          />
          <h1>{username}</h1>
        </div>
      </div>
    </div>
  );
};
