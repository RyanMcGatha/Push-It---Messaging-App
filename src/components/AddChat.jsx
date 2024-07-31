import React, { useState, useEffect, useCallback, useMemo } from "react";
import ReactSelect from "react-select";
import { useTheme } from "../contexts/ThemeContext";
import { useUserData } from "../hooks/useUserData";
import { useAddChat } from "../hooks/useAddChat";

const AddChat = () => {
  const { theme } = useTheme();
  const { username } = useUserData();
  const { loading, usernames, chatData, handleInputChange, handleCreateChat } =
    useAddChat(username);

  return (
    <div className="p-4">
      <ChatModal
        loading={loading}
        handleCreateChat={handleCreateChat}
        chatData={chatData}
        handleInputChange={handleInputChange}
        usernames={usernames}
        theme={theme}
      />
    </div>
  );
};

const ChatModal = ({
  loading,
  handleCreateChat,
  chatData,
  handleInputChange,
  usernames,
  theme,
}) => {
  const options = useMemo(
    () =>
      usernames.map((username) => ({
        value: username,
        label: username,
      })),
    [usernames]
  );

  const selectedOptions = useMemo(
    () =>
      chatData.chat_members.map((member) => ({
        value: member,
        label: member,
      })),
    [chatData.chat_members]
  );

  const onMembersChange = useCallback(
    (selectedOptions) => {
      const members = selectedOptions
        ? selectedOptions.map((option) => option.value)
        : [];
      handleInputChange("chat_members", members);
    },
    [handleInputChange]
  );

  return (
    <div
      className={`p-6 rounded-lg shadow-lg max-w-md mx-auto ${
        theme === "light" ? "bg-white" : "bg-gray-800"
      }`}
    >
      <h3
        className={`text-2xl font-bold mb-6 ${
          theme === "light" ? "text-gray-800" : "text-white"
        }`}
      >
        Create a New Chat
      </h3>
      <form onSubmit={handleCreateChat} className="space-y-6">
        <div>
          <label
            htmlFor="chat_name"
            className={`block mb-2 font-medium ${
              theme === "light" ? "text-gray-700" : "text-gray-200"
            }`}
          >
            Chat Name
          </label>
          <input
            id="chat_name"
            className={`w-full p-3 rounded-md focus:ring-2 focus:ring-opacity-50 ${
              theme === "light"
                ? "bg-gray-100 border-gray-300 focus:ring-blue-500"
                : "bg-gray-700 border-gray-600 focus:ring-blue-400"
            }`}
            type="text"
            name="chat_name"
            value={chatData.chat_name}
            placeholder="Enter chat name"
            required
            onChange={(e) => handleInputChange("chat_name", e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="is_group"
            className={`block mb-2 font-medium ${
              theme === "light" ? "text-gray-700" : "text-gray-200"
            }`}
          >
            Chat Type
          </label>
          <select
            id="is_group"
            className={`w-full p-3 rounded-md focus:ring-2 focus:ring-opacity-50 ${
              theme === "light"
                ? "bg-gray-100 border-gray-300 focus:ring-blue-500"
                : "bg-gray-700 border-gray-600 focus:ring-blue-400"
            }`}
            name="is_group"
            value={chatData.is_group}
            onChange={(e) => handleInputChange("is_group", e.target.value)}
            required
          >
            <option value={false}>One-on-One Chat</option>
            <option value={true}>Group Chat</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="chat_members"
            className={`block mb-2 font-medium ${
              theme === "light" ? "text-gray-700" : "text-gray-200"
            }`}
          >
            Chat Members
          </label>
          <ReactSelect
            id="chat_members"
            isMulti
            options={options}
            value={selectedOptions}
            onChange={onMembersChange}
            placeholder="Select members"
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: theme === "light" ? "#f3f4f6" : "#374151",
                borderRadius: "0.375rem",
                border: `1px solid ${
                  theme === "light" ? "#d1d5db" : "#4b5563"
                }`,
                boxShadow: "none",
                ":hover": {
                  border: `1px solid ${
                    theme === "light" ? "#9ca3af" : "#6b7280"
                  }`,
                },
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused
                  ? theme === "light"
                    ? "#38f092"
                    : "#444"
                  : "transparent",
                color: state.isFocused
                  ? theme === "light"
                    ? "#000"
                    : "#fff"
                  : theme === "light"
                  ? "#000"
                  : "#fff",
              }),
              multiValue: (base) => ({
                ...base,
                backgroundColor:
                  theme === "light"
                    ? "rgba(100, 100, 100, 0.1)"
                    : "rgba(100, 100, 100, 0.5)",
              }),
              multiValueLabel: (base) => ({
                ...base,
                color: theme === "light" ? "#000" : "#fff",
              }),
              multiValueRemove: (base) => ({
                ...base,
                color: "#e3342f",
                ":hover": {
                  backgroundColor: "#e3342f",
                  color: "#fff",
                },
              }),
              placeholder: (base) => ({
                ...base,
                color: theme === "light" ? "#000" : "#fff",
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: theme === "light" ? "#fff" : "#333",
                borderRadius: "10px",
              }),
            }}
            classNamePrefix="react-select"
          />
        </div>
        <div className="flex gap-4 mt-8">
          <button
            type="button"
            className={`flex-1 py-3 px-4 rounded-md text-base font-medium transition-colors ${
              theme === "light"
                ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                : "bg-gray-700 text-white hover:bg-gray-600"
            }`}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`flex-1 py-3 px-4 rounded-md text-base font-medium transition-colors ${
              theme === "light"
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-blue-600 text-white hover:bg-blue-700"
            } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? "Creating..." : "Create Chat"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddChat;
