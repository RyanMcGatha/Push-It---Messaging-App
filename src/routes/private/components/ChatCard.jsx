import React, { useEffect, useState } from "react";
import { headers } from "./Hooks";
import { useTheme } from "../../../ThemeContext";
import { BsFillMicFill } from "react-icons/bs";

export const ChatCard = ({
  id,
  title,
  usernames,
  setSelectedChat,
  setSelectedChatData,
}) => {
  const { theme } = useTheme(); // Use the theme context

  const [usersData, setUsersData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const validUsernames = usernames.filter(
          (username) => username.trim() !== ""
        );

        const usersDataArray = await Promise.all(
          validUsernames.map(async (username) => {
            const filterParams = encodeURIComponent(
              JSON.stringify({
                username,
              })
            );

            const url = `https://us-east-2.aws.neurelo.com/rest/user_profiles?filter=${filterParams}`;

            const response = await fetch(url, { method: "GET", headers });
            if (!response.ok) throw new Error("Failed to fetch user profile");
            const data = await response.json();
            return data.data[0]; // Assuming data.data is an array
          })
        );

        setUsersData(usersDataArray);
      } catch (error) {
        setError(error);
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, [usernames]);

  return (
    <div
      className={`flex items-center p-3 mb-2 rounded-md cursor-pointer ${
        theme === "light" ? "hover:bg-gray-200" : "hover:bg-dark-lighter"
      }`}
      onClick={() => {
        setSelectedChat(id);
        setSelectedChatData({ title, usernames });
      }}
    >
      {usernames
        .filter((name) => name.trim() !== "")
        .map((name, index) => {
          const user = usersData.find((user) => user?.username === name);
          const profilePic = user
            ? user.profile_pic
            : "default-profile-pic-url"; // Use a default image if profile_pic is not found

          return (
            <img
              key={index}
              src={profilePic}
              alt={`${name}'s profile`}
              className="w-10 h-10 rounded-full mr-3"
            />
          );
        })}

      <div className="flex-grow">
        <div className="flex justify-between">
          <p
            className={`font-semibold ${
              theme === "light" ? "text-black" : "text-white"
            }`}
          >
            {title}
          </p>
          <span className="text-gray-400 text-sm">12:23</span>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-gray-400 text-sm flex items-center">
            <BsFillMicFill className="mr-1" /> Voice message
          </p>
          <div className="flex items-center space-x-1">
            <span className="bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              9
            </span>
            <span className="text-blue-500">
              <BsFillMicFill />
            </span>
          </div>
        </div>
      </div>

      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  );
};
