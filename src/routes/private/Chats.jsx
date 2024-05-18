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
  const { chats, loading, error, setChats } = getUserData();
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    if (!loading && !error && chats.length > 0) {
      const initialChat = chats[0];
      setSelectedChat(initialChat.chat_id);
      setSelectedChatData(initialChat);
      setSelectedChatId(initialChat.chat_id);
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

  const handleDeleteNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification("");
    }, 5000);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex flex-col w-full">
      {notification && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded relative flex items-center space-x-4"
          role="alert"
        >
          <div className="flex items-center justify-between">
            <svg
              className="w-6 h-6 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zm4.768 9.14c.0878-.1004.1546-.21726.1966-.34383.0419-.12657.0581-.26026.0477-.39319-.0105-.13293-.0475-.26242-.1087-.38085-.0613-.11844-.1456-.22342-.2481-.30879-.1024-.08536-.2209-.14938-.3484-.18828s-.2616-.0519-.3942-.03823c-.1327.01366-.2612.05372-.3782.1178-.1169.06409-.2198.15091-.3027.25537L12.243 15.482 9.993 13.257c-.1886-.1822-.4412-.283-.7034-.2807s-.51301.1075-.69842.2929-.29058.4362-.29285.6984c-.00228.2622.09851.5148.28067.7034l3 3c.0983.0982.2159.1748.3454.2251.1295.0502.2681.0729.4069.0665.1387-.0063.2747-.0414.3991-.1032.1244-.0617.2347-.1487.3236-.2554z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span>{notification}</span>
          </div>
          <button
            type="button"
            className="close"
            onClick={() => setNotification("")}
          >
            <svg
              className="w-6 h-6 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 8.586l4.95-4.95a1 1 0 011.414 0l1.414 1.414a1 1 0 010 1.414L12.828 10l4.95 4.95a1 1 0 010 1.414l-1.414 1.414a1 1 0 01-1.414 0L10 12.828l-4.95 4.95a1 1 0 01-1.414 0L2.222 15.95a1 1 0 010-1.414L7.172 10 2.222 5.05a1 1 0 010-1.414l1.414-1.414a1 1 0 011.414 0L10 8.586z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      )}
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
              setSelectedChatId(id);
            }}
            setSelectedChatData={setSelectedChatData}
            userData={userData}
            usersData={usersData}
            selectedChatId={selectedChatId}
            chats={chats}
            setChats={setChats}
            onChatDelete={handleDeleteNotification}
          />
        ))
      )}
    </div>
  );
};

export default Chats;
