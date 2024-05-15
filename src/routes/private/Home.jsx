import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Chats from "./Chats";

import Messages from "./Messages";

const Home = () => {
  const [selected, setSelected] = useState(tabs[0]);
  const [selectedChat, setSelectedChat] = useState(0);
  const [selectedChatData, setSelectedChatData] = useState({});

  return (
    <>
      <div className="w-full h-full flex">
        <div
          className=" bg-[#16181c] flex flex-col overflow-y-scroll h-full no-scrollbar"
          style={{ width: "30%" }}
        >
          <div className="flex flex-col items-center w-full p-5">
            <div className="flex w-fit p-5 bg-[#080809] rounded-full justify-center">
              {tabs.map((tab) => (
                <Chip
                  text={tab}
                  selected={selected === tab}
                  setSelected={setSelected}
                  key={tab}
                />
              ))}

              <a></a>
            </div>
            <Chats
              selected={selected}
              setSelectedChat={setSelectedChat}
              selectedChatData={selectedChatData}
              setSelectedChatData={setSelectedChatData}
            />
          </div>
        </div>
        <div
          className=""
          style={{
            width: "70%",
            backgroundColor: "black",
          }}
        >
          <Messages selectedChat={selectedChat} />
        </div>
      </div>
    </>
  );
};

export default Home;

const tabs = ["One's", "Group's", "New Push"];
const Chip = ({ text, selected, setSelected }) => {
  return (
    <button
      onClick={() => setSelected(text)}
      className={`${
        selected
          ? "text-white"
          : "text-slate-300 hover:text-slate-200 hover:bg-slate-700"
      } text-sm transition-colors px-2.5 py-0.5 rounded-md relative `}
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
