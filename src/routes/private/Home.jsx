import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import OnesCard from "./components/OnesCard";
import AddChat from "./components/AddChat";
import { supabase } from "../../../supabaseConfig";
import MobileNav from "./components/MobileNav";

const Home = () => {
  const [chats, setChats] = useState([]);
  const [username, setUsername] = useState("");
  console.log(chats);

  const handleDeleteChat = (chatId) => {
    const updatedChats = chats.filter((chat) => chat.chat_id !== chatId);
    setChats(updatedChats);
  };

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error getting user:", error.message);
        return;
      }
      setUsername(data.user.user_metadata.username);
    };

    getUser();
  }, []);

  useEffect(() => {
    if (username) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            "https://us-east-2.aws.neurelo.com/rest/chats",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "X-API-KEY":
                  "neurelo_9wKFBp874Z5xFw6ZCfvhXVDJ+LiTxRH5g8EIPHIltF4eJyUkIkPuZa28E/j27n4p7g78sodDoNFVybTx3GuBXAQY2QFUoXUQQff3EYC8Yp9b0HY1CmFBYQQQYKrKXWHzocwrP/W6PeIG+R8mwaPKJ/Q0YH42gsX2Pm2oNj1LpgHkX6CinOF6GPzXyftO88Hm_6WDq3T3BsqUg5xLhWKkSs5N9zZ4PXT+Y+THHalGqfb8=",
              },
            }
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const { data } = await response.json();

          const relevantChats = data.filter((chat) =>
            chat.user_names.includes(username)
          );
          setChats(relevantChats);
        } catch (error) {
          console.error(
            "There was a problem with your fetch operation:",
            error
          );
        }
      };

      fetchData();
    }
  }, [username]);

  return (
    <>
      <div className="bg-eucalyptus-950 flex flex-col p-2 sm:p-4 md:p-5 overflow-y-scroll max-h-screen no-scrollbar">
        <div className="flex flex-col items-center md:items-start">
          <div className="flex justify-center md:justify-end w-full p-2">
            <a>
              <AddChat username={username} />
            </a>
          </div>

          <h1 className="text-center md:text-left text-eucalyptus-200 text-2xl sm:text-3xl md:text-4xl lg:text-6xl pt-3 sm:pt-4 md:pt-5">
            One on one's
          </h1>
          <div className="flex items-center justify-center md:justify-start w-full p-3 md:p-7 gap-5 md:gap-8 flex-wrap">
            {chats
              .filter((chat) => !chat.is_group)
              .map((chat) => (
                <OnesCard
                  key={chat.chat_id}
                  title={chat.chat_name}
                  id={chat.chat_id}
                  usernames={chat.user_names}
                  chats={chats}
                  onDelete={handleDeleteChat} // Passing the delete handler
                />
              ))}
          </div>
          <h1 className="text-center md:text-left text-eucalyptus-200 text-2xl sm:text-3xl md:text-4xl lg:text-6xl pt-3 sm:pt-4 md:pt-5">
            Groups
          </h1>
          <div className="flex items-center justify-center md:justify-start w-full p-3 md:p-7 gap-3 md:gap-5 flex-wrap mb-28">
            {chats
              .filter((chat) => chat.is_group)
              .map((chat) => (
                <OnesCard
                  key={chat.chat_id}
                  title={chat.chat_name}
                  id={chat.chat_id}
                  usernames={chat.user_names}
                  onDelete={handleDeleteChat} // Passing the delete handler
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
