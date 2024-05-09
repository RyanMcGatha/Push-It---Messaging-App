import SearchBar from "./components/SearchBar";
import React, { useState, useEffect } from "react";
import OnesCard from "./components/OnesCard";
import AddChat from "./components/AddChat";
import { supabase } from "../../../supabaseConfig";
import MobileNav from "./components/MobileNav";
import { motion } from "framer-motion";

const tabs = ["One's", "Group's", "New Push"];

const Home = () => {
  const [chats, setChats] = useState([]);
  const [username, setUsername] = useState("");
  const [selected, setSelected] = useState(tabs[0]);

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
      <div className="w-full h-full flex">
        <div
          className="bg-eucalyptus-950 flex flex-col overflow-y-scroll h-screen no-scrollbar"
          style={{ width: "30%" }}
        >
          <div className="flex flex-col items-center md:items-start w-full">
            <div className="flex justify-start w-full p-4 ">
              {tabs.map((tab) => (
                <Chip
                  text={tab}
                  selected={selected === tab}
                  setSelected={setSelected}
                  key={tab}
                />
              ))}

              {/* <a>
                <AddChat username={username} />
              </a> */}
            </div>

            <div className="flex items-center justify-center md:justify-start w-full gap-2 flex-wrap">
              {chats
                .filter((chat) => !chat.is_group)
                .map((chat) => (
                  <OnesCard
                    key={chat.chat_id}
                    title={chat.chat_name}
                    id={chat.chat_id}
                    usernames={chat.user_names}
                    chats={chats}
                    onDelete={handleDeleteChat}
                  />
                ))}
            </div>
            <h1 className="text-center md:text-left text-eucalyptus-200 text-2xl sm:text-3xl md:text-4xl lg:text-6xl pt-3 sm:pt-4 md:pt-5">
              Groups
            </h1>
            <div className="flex items-center justify-center md:justify-start w-full gap-5 md:gap-8 flex-wrap">
              {chats
                .filter((chat) => chat.is_group)
                .map((chat) => (
                  <OnesCard
                    key={chat.chat_id}
                    title={chat.chat_name}
                    id={chat.chat_id}
                    usernames={chat.user_names}
                    onDelete={handleDeleteChat}
                  />
                ))}
            </div>
          </div>
        </div>
        <div
          className=" h-full"
          style={{
            width: "70%",
            backgroundImage: "url(bg.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            rotate: "180deg",
          }}
        ></div>
      </div>
    </>
  );
};

export default Home;

const Chip = ({ text, selected, setSelected }) => {
  return (
    <button
      onClick={() => setSelected(text)}
      className={`${
        selected
          ? "text-white"
          : "text-slate-300 hover:text-slate-200 hover:bg-slate-700"
      } text-sm transition-colors px-2.5 py-0.5 rounded-md relative`}
    >
      <span className="relative z-10">{text}</span>
      {selected && (
        <motion.span
          layoutId="pill-tab"
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute inset-0 z-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-md"
        ></motion.span>
      )}
    </button>
  );
};
