import SearchBar from "./components/SearchBar";
import React, { useState, useEffect } from "react";
import OnesCard from "./components/OnesCard";
import AddChat from "./components/AddChat";
import { supabase } from "../../../supabaseConfig";
import { apiKey } from "../../../supabaseConfig";
import MobileNav from "./components/MobileNav";
import { motion } from "framer-motion";
import Chats from "./Chats";
import OneOnOne from "./OneOnOne";
import Messages from "./Messages";

const Home = () => {
  const [selected, setSelected] = useState(tabs[0]);
  const [selectedChat, setSelectedChat] = useState(0);

  return (
    <>
      <div className="w-full h-full flex">
        <div
          className="bg-eucalyptus-950 flex flex-col overflow-y-scroll h-full no-scrollbar"
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

              <a></a>
            </div>
            <Chats selected={selected} setSelectedChat={setSelectedChat} />
          </div>
        </div>
        <div
          className=""
          style={{
            width: "70%",
            backgroundImage: "url(bg.png)",
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
