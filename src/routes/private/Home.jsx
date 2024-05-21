import React, { useState, useEffect, useCallback } from "react";
import { Chats } from "./Chats";
import Messages from "./Messages";
import { useUser, addChat, headers } from "./components/Hooks";
import { useTheme } from "../../ThemeContext";
import { motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

export const tabs = ["Ones", "Groups", "Add Chat"];

const Home = () => {
  const [selected, setSelected] = useState(tabs[0]);
  const [selectedChat, setSelectedChat] = useState(0); // <-- Ensure this is correctly defined
  const [selectedChatData, setSelectedChatData] = useState({});
  const { userData } = useUser();
  const { theme, toggleTheme } = useTheme();
  const { usernames } = addChat();
  const userCache = {};
  const [mobileChatsNav, setMobileChatsNav] = useState("closed");

  const [usersData, setUsersData] = useState([]);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async () => {
    try {
      const validUsernames = usernames.filter(
        (username) => username.trim() !== ""
      );
      const usersDataArray = await Promise.all(
        validUsernames.map(async (username) => {
          if (userCache[username]) return userCache[username];
          const filterParams = encodeURIComponent(JSON.stringify({ username }));
          const url = `https://us-east-2.aws.neurelo.com/rest/user_profiles?filter=${filterParams}`;
          const response = await fetch(url, { method: "GET", headers });
          if (!response.ok) throw new Error("Failed to fetch user profile");
          const data = await response.json();
          userCache[username] = data.data[0];
          return data.data[0];
        })
      );
      setUsersData(usersDataArray);
    } catch (error) {
      setError(error);
      console.error("Failed to fetch users:", error);
    }
  }, [usernames]);

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
    <div className={`w-full h-full flex ${themeClasses}`}>
      <div
        className={`hidden md:flex flex-col w-full md:w-25p h-50 md:h-full overflow-y-scroll no-scrollbar ${sidebarClasses}`}
      >
        <div className="flex flex-col items-center w-full p-5">
          <input
            type="text"
            placeholder="Search..."
            className={`w-full p-3 rounded-full ${inputClasses} focus:outline-none`}
          />
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
            setSelectedChat={setSelectedChat} // <-- Ensure correct prop passing
            selectedChatData={selectedChatData}
            setSelectedChatData={setSelectedChatData}
            userData={userData}
            usersData={usersData}
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
            style={{ originY: "top", translateX: "-100%" }}
            className="flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] w-60 overflow-hidden"
          >
            <Chats
              selected={selected}
              setSelectedChat={setSelectedChat}
              selectedChatData={selectedChatData}
              setSelectedChatData={setSelectedChatData}
              userData={userData}
              usersData={usersData}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
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
