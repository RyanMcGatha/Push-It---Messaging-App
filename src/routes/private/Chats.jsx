import React, { useState, useEffect } from "react";
import { getUserData } from "./components/Hooks";
import { ChatCard } from "./components/ChatCard.jsx";

const Chats = ({
  selected,
  setSelectedChat,
  setSelectedChatData,
  userData,
}) => {
  const { chats, loading, error } = getUserData();

  useEffect(() => {
    if (!loading && !error && chats.length > 0) {
      const initialChat = chats[0];
      setSelectedChat(initialChat.chat_id);
      setSelectedChatData(initialChat);
    }
  }, [loading, error, chats, setSelectedChat, setSelectedChatData]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      {selected === "Ones" && (
        <div className="flex flex-col w-full">
          {chats
            .filter((chat) => !chat.is_group)
            .map((chat) => (
              <ChatCard
                key={chat.chat_id}
                title={chat.chat_name}
                id={chat.chat_id}
                usernames={chat.user_names}
                setSelectedChat={setSelectedChat}
                setSelectedChatData={setSelectedChatData}
                userData={userData}
              />
            ))}
        </div>
      )}
      {selected === "Groups" && (
        <div className="flex flex-col w-full">
          {chats
            .filter((chat) => chat.is_group)
            .map((chat) => (
              <ChatCard
                key={chat.chat_id}
                title={chat.chat_name}
                id={chat.chat_id}
                usernames={chat.user_names}
                setSelectedChat={setSelectedChat}
                setSelectedChatData={setSelectedChatData}
                userData={userData}
              />
            ))}
        </div>
      )}
      {selected === "Contacts" && (
        <div className="flex flex-col w-full">
          {chats
            .filter((chat) => !chat.is_group)
            .map((chat) => (
              <ChatCard
                key={chat.chat_id}
                title={chat.chat_name}
                id={chat.chat_id}
                usernames={chat.user_names}
                setSelectedChat={setSelectedChat}
                setSelectedChatData={setSelectedChatData}
                userData={userData}
              />
            ))}
        </div>
      )}
    </>
  );
};

export default Chats;
