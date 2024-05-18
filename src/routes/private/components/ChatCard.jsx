import React from "react";
import { useTheme } from "../../../ThemeContext";
import { BiTrash } from "react-icons/bi";
import { headers } from "./Hooks";

export const ChatCard = ({
  id,
  title,
  usernames,
  setSelectedChat,
  setSelectedChatData,
  usersData,
  selectedChatId,
  chats,
  setChats,
  onChatDelete,
}) => {
  const { theme } = useTheme();

  const handleChatClick = () => {
    setSelectedChat(id);
    setSelectedChatData({ title, usernames });
  };

  const isSelected = id === selectedChatId;

  const handleChatDelete = async (event) => {
    event.stopPropagation();

    const chatId = Number(id);
    const url = `https://us-east-2.aws.neurelo.com/rest/chats/${chatId}`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers,
      });

      if (!response.ok) throw new Error("Failed to delete chat");

      setChats((prevChats) =>
        prevChats.filter((chat) => chat.chat_id !== chatId)
      );
      onChatDelete("Chat deleted successfully");
    } catch (error) {
      console.error("Error deleting chat: ", error.message);
    }
  };

  return (
    <div
      className={`flex items-center p-3 mb-2 rounded-md cursor-pointer transition-colors ${
        isSelected
          ? theme === "light"
            ? "bg-gray-200"
            : "bg-dark"
          : theme === "light"
          ? "hover:bg-gray-200"
          : "hover:bg-dark"
      }`}
      onClick={handleChatClick}
    >
      {usernames
        .filter((name) => name.trim() !== "")
        .map((name, index) => {
          const user = usersData.find((user) => user?.username === name);
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
            onClick={handleChatDelete}
            className="text-red-500 cursor-pointer"
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-1"></div>
        </div>
      </div>
    </div>
  );
};
