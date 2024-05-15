import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RiFolderAddLine } from "react-icons/ri";
import ReactSelect from "react-select";
import OnesCard from "./components/OnesCard";

import { getUserData } from "./components/Hooks.jsx";
import { addChat } from "./components/Hooks.jsx";
import ChatCard from "./components/ChatCard.jsx";

const Chats = ({
  selected,
  setSelectedChat,
  selectedChatData,
  setSelectedChatData,
}) => {
  const { chats, username, loading, error } = getUserData();

  const handleDeleteChat = (chatId) => {
    const updatedChats = chats.filter((chat) => chat.chat_id !== chatId);
    setChats(updatedChats);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      {selected === "One's" && (
        <Ones
          setSelectedChat={setSelectedChat}
          setSelectedChatData={setSelectedChatData}
        />
      )}
      {selected === "Group's" && <Groups />}
      {selected === "New Push" && <NewChat />}
    </>
  );
};

export default Chats;

const NewChat = () => {
  const { loading, handleCreateChat, chatData, handleInputChange, usernames } =
    addChat();
  const options = usernames.map((username) => ({
    value: username,
    label: username,
  }));
  const selectedOptions = chatData.chat_members.map((member) => ({
    value: member,
    label: member,
  }));

  const onMembersChange = (selectedOptions) => {
    const members = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    handleInputChange("chat_members", members);
  };

  return (
    <div className="bg-gradient-to-br from-eucalyptus-800 to-eucalyptus-950 text-eucalyptus-200 p-6 rounded-xl w-full max-w-lg shadow-xl cursor-default relative border-eucalyptus-400 border-4 ">
      <RiFolderAddLine className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
      <div className="relative z-10">
        <h3 className="text-3xl font-bold text-center mb-2">
          Enter New Chat Details!
        </h3>
        <form
          onSubmit={handleCreateChat}
          className="flex flex-col text-xl gap-2 p-10"
        >
          <input
            className="rounded-xl p-3 placeholder-eucalyptus-200 focus:outline-eucalyptus-400"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              backdropFilter: "blur(15px)",
              border: "solid 2px white",
            }}
            type="text"
            name="chat_name"
            value={chatData.chat_name}
            placeholder="CHAT NAME"
            required={true}
            onChange={(e) => handleInputChange("chat_name", e.target.value)}
          />
          <select
            className="rounded-xl p-3 placeholder-eucalyptus-200 focus:outline-eucalyptus-400"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              backdropFilter: "blur(15px)",
              border: "solid 2px white",
            }}
            name="is_group"
            value={chatData.is_group}
            onChange={(e) => handleInputChange("is_group", e.target.value)}
            required={true}
          >
            <option value={false}>One On One</option>
            <option value={true}>Group Chat</option>
          </select>

          <ReactSelect
            isMulti
            options={options}
            value={selectedOptions}
            onChange={onMembersChange}
            placeholder="Select Members"
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                borderRadius: "11px",
                border: "2px solid white",
                padding: "5px",
                ":hover": {
                  border: "2px solid #38f092",
                },
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused ? "#38f092" : "transparent",
                color: "white",
              }),
              multiValue: (base) => ({
                ...base,
                backgroundColor: "rgba(100, 100, 100, 0.5)",
              }),
              multiValueLabel: (base) => ({
                ...base,
                color: "white",
              }),
              multiValueRemove: (base) => ({
                ...base,
                color: "red",
                ":hover": {
                  backgroundColor: "red",
                  color: "white",
                },
              }),
              placeholder: (base) => ({
                ...base,
                color: "white",
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: "rgba(50, 50, 50, 0.7)",
                borderRadius: "10px",
              }),
            }}
            className=""
            classNamePrefix="react-select"
          />

          <div className="flex gap-5 items-center mt-5">
            <button
              type="button"
              className="bg-eucalyptus-800 text-eucalyptus-200 font-medium px-4 py-4 rounded-xl hover:bg-eucalyptus-700 transition-opacity text-2xl w-full"
            >
              Go Back
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-eucalyptus-800 text-eucalyptus-200 font-medium px-4 py-4 rounded-xl hover:bg-eucalyptus-700 transition-opacity text-2xl w-full"
            >
              {loading ? "Creating ..." : "Create Chat"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Groups = () => {
  const { chats, handleDeleteChat } = getUserData();

  return (
    <>
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
    </>
  );
};

const Ones = ({ setSelectedChat, setSelectedChatData }) => {
  const { chats, handleDeleteChat } = getUserData();

  return (
    <>
      <div className="flex items-center justify-center md:justify-start w-full gap-2 flex-wrap">
        {chats
          .filter((chat) => !chat.is_group)
          .map((chat) => (
            <ChatCard
              key={chat.chat_id}
              title={chat.chat_name}
              id={chat.chat_id}
              usernames={chat.user_names}
              chats={chats}
              onDelete={handleDeleteChat}
              setSelectedChat={setSelectedChat}
              setSelectedChatData={setSelectedChatData}
            />
          ))}
      </div>
    </>
  );
};
