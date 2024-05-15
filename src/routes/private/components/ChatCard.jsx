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
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="w-full p-5 items-center flex text-white gap-5 hover:bg-[#080809] cursor-pointer rounded-xl"
        onClick={() => {
          setSelectedChat(id);
          setSelectedChatData(title, usernames);
        }}
      >
        {usernames.map((name, index) => (
          <CgProfile key={index} className="text-4xl" />
        ))}
        <p>{title}</p>
      </div>
    </>
  );
};

export default ChatCard;
