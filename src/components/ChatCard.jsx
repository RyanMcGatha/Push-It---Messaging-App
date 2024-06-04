import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import { BiTrash } from "react-icons/bi";

export const ChatCard = ({
  id,
  title,
  usernames,
  setSelectedChat,
  setSelectedChatData,
  usersData,
  selectedChatId,
  setChats,
  onChatDelete,
}) => {
  const { theme } = useTheme();

  const handleChatClick = () => {
    setSelectedChat(id);
    setSelectedChatData({ title, usernames });
  };

  const isSelected = id === selectedChatId;

  const handleChatDeletion = async (event) => {
    event.stopPropagation();

    try {
      const response = await fetch(
        `https://push-it-backend.vercel.app/delete-chat`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ chat_id: Number(id) }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete chat");
      }

      setChats((prevChats) => prevChats.filter((chat) => chat.chat_id !== id));
      onChatDelete("Chat deleted successfully");
    } catch (error) {
      console.error("Failed to delete chat:", error.message);
      onChatDelete("Failed to delete chat");
    }
  };

  return (
    <div
      className={`flex items-center p-3 mb-1 w-full rounded-md cursor-pointer transition-colors overflow-hidden border ${
        isSelected
          ? theme === "light"
            ? "bg-gray-200 border-gray-300"
            : "bg-dark border-gray-400"
          : theme === "light"
          ? "hover:bg-gray-200 border-gray-300"
          : "hover:bg-dark border-gray-700"
      }`}
      onClick={handleChatClick}
    >
      {usernames
        .filter((name) => name.trim() !== "")
        .map((name, index) => {
          const user = usersData
            ? usersData.find((user) => user?.username === name)
            : null;
          const profilePic = user
            ? user.profile_pic
            : "default-profile-pic-url";
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
            className={`font-semibold capitalize ${
              theme === "light" ? "text-black" : "text-white"
            }`}
          >
            {title}
          </p>
          <BiTrash
            onClick={handleChatDeletion}
            className="text-red-500 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
