import React, { useState, useEffect } from "react";
import { useUser, headers } from "./components/Hooks";
import ChatCard from "./components/ChatCard";
import { useParams } from "react-router-dom";
import { supabase } from "../../../supabaseConfig";

export const Profile = () => {
  const { userData } = useUser();
  const { username } = useParams();
  const [profilePic, setProfilePic] = useState("");
  console.log(userData);

  const handleProfilePic = async (event) => {
    event.preventDefault();

    try {
      const file = event.target.files[0];
      const { data, error } = await supabase.storage
        .from("profile_pictures")
        .upload(`${username}/profile-pic`, file, {
          upsert: false,
        });
      if (error) throw error;
      try {
        const { data, error } = supabase.storage
          .from("profile_pictures")
          .getPublicUrl(`${username}/profile-pic`);
        if (error) throw error;
        setProfilePic(data);
        try {
          const filterParams = encodeURIComponent(
            JSON.stringify({
              username,
            })
          );
          const url = `https://us-east-2.aws.neurelo.com/rest/user_profiles?filter=${filterParams}`;

          const response = await fetch(url, {
            method: "PATCH",
            headers,
            body: JSON.stringify({
              profile_pic: data.publicUrl,
            }),
          });

          if (!response.ok) throw new Error("Failed to update profile pic");

          const result = await response.json();
          console.log(result);
        } catch (error) {
          console.error("Error updating profile pic: ", error.message);
        }
      } catch (error) {
        console.error("Error fetching url: ", error.message);
      }
    } catch (error) {
      console.error("Error uploading file: ", error.message);
    }
  };

  return (
    <>
      <div
        className="flex flex-col items-center
      justify-center w-full h
      -full bg-[#16181c]
      text-white"
      >
        <div className="flex flex-col items-center w-full p-5">
          <div className="flex flex-col items-center gap-5">
            <input type="file" accept="image/*" onChange={handleProfilePic} />
            <img
              src={userData[0]?.profile_pic || profilePic}
              alt="profile-pic"
              className="w-40 h-40 rounded-full"
            />
            <h1>{username}</h1>
          </div>
        </div>
      </div>
    </>
  );
};
