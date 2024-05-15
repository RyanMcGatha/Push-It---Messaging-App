import React, { useState } from "react";
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
      <div className="w-full p-5 items-center flex text-white gap-5">
        <FiMessageCircle className="" />
        <p>{title}</p>
      </div>
    </>
  );
};

export default ChatCard;
