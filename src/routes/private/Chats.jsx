import React, { useState, useEffect, useMemo } from "react";
import { getUserData } from "./components/Hooks";
import { ChatCard } from "./components/ChatCard.jsx";
import AddChat from "./components/AddChat.jsx";

const Chats = ({
  selected,
  setSelectedChat,
  setSelectedChatData,
  userData,
  usersData,
}) => {
  const { chats, loading, error } = getUserData();
  const [selectedChatId, setSelectedChatId] = useState(null);

  useEffect(() => {
    if (!loading && !error && chats.length > 0) {
      const initialChat = chats[0];
      setSelectedChat(initialChat.chat_id);
      setSelectedChatData(initialChat);
      setSelectedChatId(initialChat.chat_id); // Set the initial selected chat
    }
  }, [loading, error, chats, setSelectedChat, setSelectedChatData]);

  const filteredChats = useMemo(() => {
    switch (selected) {
      case "Ones":
        return chats.filter((chat) => !chat.is_group);
      case "Groups":
        return chats.filter((chat) => chat.is_group);
      default:
        return [];
    }
  }, [selected, chats]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex flex-col w-full">
      {selected === "Add Chat" ? (
        <AddChat userData={userData} />
      ) : (
        filteredChats.map((chat) => (
          <ChatCard
            key={chat.chat_id}
            title={chat.chat_name}
            id={chat.chat_id}
            usernames={chat.user_names}
            setSelectedChat={(id) => {
              setSelectedChat(id);
              setSelectedChatId(id); // Update selected chat ID
            }}
            setSelectedChatData={setSelectedChatData}
            userData={userData}
            usersData={usersData}
            selectedChatId={selectedChatId} // Pass selected chat ID to ChatCard
          />
        ))
      )}
    </div>
  );
};

export default Chats;
