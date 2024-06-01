import React, { useState, useEffect, useCallback } from "react";
import { Chats } from "./Chats";
import Messages from "./Messages";
import { useUser, addChat, headers } from "./components/Hooks";
import { useTheme } from "../../ThemeContext";
import { motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import AddChat from "./components/AddChat";

export const tabs = ["Ones", "Groups", "Add Chat"];

const Home = () => {
  const [selected, setSelected] = useState(tabs[0]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedChatData, setSelectedChatData] = useState({});
  const { userData, username } = useUser();
  const { theme, toggleTheme } = useTheme();
  const { usernames } = addChat();
  const [mobileChatsNav, setMobileChatsNav] = useState("closed");

  const [usersData, setUsersData] = useState([]);
  const [error, setError] = useState(null);

  const [verificationMessage, setVerificationMessage] = useState("");

  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch(
        "https://push-it-backend.vercel.app/all-profiles",
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      } else {
        const data = await response.json();
        setUsersData(data);
      }
    } catch (error) {
      setError(error);
      console.error("There was a problem fetching users:", error);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSetSelected = useCallback((tab) => {
    setSelected(tab);
  }, []);

  const themeClasses =
    theme === "light" ? "bg-white text-black" : "bg-dark text-white";
  const sidebarClasses = theme === "light" ? "bg-gray-100" : "bg-dark-lighter";
  const inputClasses =
    theme === "light"
      ? "bg-gray-200 text-black placeholder-gray-600"
      : "bg-gray-700 text-white placeholder-gray-400";

  return (
    <>
      <div className={`w-full h-full flex ${themeClasses}`}>
        <div
          className={`hidden md:flex flex-col w-full md:w-25p h-50 md:h-full overflow-y-scroll no-scrollbar ${sidebarClasses}`}
        >
          <div className="flex flex-col items-center w-full p-5">
            <div className="flex justify-around w-full mt-4 mb-4">
              {tabs.map((tab) => (
                <Chip
                  text={tab}
                  selected={selected === tab}
                  setSelected={handleSetSelected}
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
              usersData={usersData}
              username={username}
            />
          </div>
        </div>
        <div className="w-full md:w-75p h-90p md:h-full">
          <Messages
            selectedChat={selectedChat}
            userData={userData}
            selectedChatData={selectedChatData}
            usersData={usersData}
            mobileChatsNav={mobileChatsNav}
            setMobileChatsNav={setMobileChatsNav}
          />
        </div>
        <div className="absolute top-1 left-32 w-full p-4 md:hidden">
          <motion.div
            animate={mobileChatsNav === "open" ? "open" : "closed"}
            className="relative z-[30]"
          >
            <button
              onClick={() =>
                setMobileChatsNav(mobileChatsNav === "open" ? "closed" : "open")
              }
              className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 bg-gray-100 hover:bg-indigo-500 transition-colors"
            >
              <span className="font-medium text-sm">Chats</span>
              <motion.span variants={iconVariants}>
                <FiChevronDown />
              </motion.span>
            </button>

            <motion.div
              initial={wrapperVariants.closed}
              variants={wrapperVariants}
              style={{ originY: "top", translateX: "-50%" }}
              className={`absolute top-10 right-0 w-64 p-4  shadow-md rounded-md z-20 overflow-hidden ${
                mobileChatsNav === "open" ? "visible" : "hidden"
              } ${theme === "light" ? "bg-gray-100" : "bg-dark-lighter"}`}
            >
              <Chats
                selected={selected}
                setSelectedChat={setSelectedChat}
                selectedChatData={selectedChatData}
                setSelectedChatData={setSelectedChatData}
                userData={userData}
                usersData={usersData}
              />
              <button
                onClick={() => setSelected("Add Chat")}
                className={`flex items-center p-3 mb-1 w-full rounded-md cursor-pointer transition-colors overflow-hidden border ${
                  theme === "light"
                    ? "bg-gray-200 border-gray-300"
                    : "bg-dark border-gray-400"
                }`}
              >
                Add Chat
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
      {verificationMessage && (
        <div className="fixed bottom-0 left-0 right-0 bg-green-500 text-white p-4 text-center">
          {verificationMessage}
        </div>
      )}
    </>
  );
};

export default Home;

export const Chip = React.memo(({ text, selected, setSelected }) => {
  const { theme } = useTheme();

  const chipClasses = selected
    ? theme === "light"
      ? "text-white bg-gray-700"
      : "text-white bg-gray-700"
    : theme === "light"
    ? "text-gray-600 hover:text-gray-800 hover:bg-gray-300"
    : "text-gray-400 hover:text-gray-200 hover:bg-gray-600";

  return (
    <button
      onClick={() => setSelected(text)}
      className={`text-sm transition-colors px-4 py-2 rounded-full ${chipClasses}`}
    >
      {text}
    </button>
  );
});

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};
