import React, { useState } from "react";
import { motion } from "framer-motion";
import Chats from "./Chats";
import Messages from "./Messages";
import { useUser } from "./components/Hooks";
import { useTheme } from "../../ThemeContext";

const tabs = ["Ones", "Groups", "Add Chat"];

const Home = () => {
  const [selected, setSelected] = useState(tabs[0]);
  const [selectedChat, setSelectedChat] = useState(0);
  const [selectedChatData, setSelectedChatData] = useState({});
  const { userData } = useUser();
  const { theme, toggleTheme } = useTheme(); // Use the theme context

  console.log(selectedChatData);

  return (
    <div
      className={`w-full h-full flex ${
        theme === "light" ? "bg-white text-black" : "bg-dark text-white"
      }`}
    >
      <div
        className={`flex flex-col overflow-y-scroll h-full no-scrollbar ${
          theme === "light" ? "bg-gray-100" : "bg-dark-lighter"
        }`}
        style={{ width: "30%" }}
      >
        <div className="flex flex-col items-center w-full p-5">
          <input
            type="text"
            placeholder="Search..."
            className={`w-full p-3 rounded-full ${
              theme === "light"
                ? "bg-gray-200 text-black placeholder-gray-600"
                : "bg-gray-700 text-white placeholder-gray-400"
            } focus:outline-none`}
          />
          <div className="flex justify-around w-full mt-4 mb-4">
            {tabs.map((tab) => (
              <Chip
                text={tab}
                selected={selected === tab}
                setSelected={setSelected}
                key={tab}
              />
            ))}
          </div>
          <Chats
            selected={selected}
            setSelectedChat={setSelectedChat}
            selectedChatData={selectedChatData}
            setSelectedChatData={setSelectedChatData}
            userData={userData}
          />
        </div>
      </div>
      <div className={`w-2/3 ${theme === "light" ? "bg-white" : "bg-dark"}`}>
        <Messages
          selectedChat={selectedChat}
          userData={userData}
          selectedChatData={selectedChatData}
        />
      </div>
    </div>
  );
};

export default Home;

const Chip = ({ text, selected, setSelected }) => {
  const { theme } = useTheme(); // Use the theme context

  return (
    <button
      onClick={() => setSelected(text)}
      className={`${
        selected
          ? theme === "light"
            ? "text-white bg-gray-700"
            : "text-white bg-gray-700"
          : theme === "light"
          ? "text-gray-600 hover:text-gray-800 hover:bg-gray-300"
          : "text-gray-400 hover:text-gray-200 hover:bg-gray-600"
      } text-sm transition-colors px-4 py-2 rounded-full`}
    >
      {text}
    </button>
  );
};
