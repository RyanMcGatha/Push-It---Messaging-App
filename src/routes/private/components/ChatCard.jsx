import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FiMessageCircle } from "react-icons/fi";

const ChatCard = ({
  id,
  title,
  usernames,
  chats,
  onDelete,
  setSelectedChat,
  setSelectedChatData,
  userData,
}) => {
  const [open, setOpen] = useState(false);
  console.log(userData);

  return (
    <>
      <div
        className="w-full p-5 items-center flex text-white gap-5 hover:bg-[#080809] cursor-pointer rounded-xl"
        onClick={() => {
          setSelectedChat(id);
          setSelectedChatData(title, usernames);
        }}
      >
        {usernames.map((name, index) => {
          const user = userData.find((user) => user.username === name);
          return (
            <img
              key={index}
              src={user?.profile_pic || "default-profile-pic-url"}
              alt={`${name}'s profile`}
              className="w-10 h-10 rounded-full border-2 border-eucalyptus-400 bg-eucalyptus-950 p-2 text-6xl text-eucalyptus-200"
            />
          );
        })}
        <p>{title}</p>
      </div>
    </>
  );
};

export default ChatCard;
