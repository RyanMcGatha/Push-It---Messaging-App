import React, { useState, useEffect } from "react";
import { RiFolderAddLine } from "react-icons/ri";
import ReactSelect from "react-select";
import { headers } from "./Hooks";
import { useTheme } from "../../../ThemeContext";

const AddChat = ({ userData }) => {
  const [loading, setLoading] = useState(false);
  const [usernames, setUsernames] = useState([]);
  const [chatData, setChatData] = useState({
    chat_name: "",
    is_group: false,
    chat_members: [],
  });

  const { theme } = useTheme();

  const username = userData?.[0]?.username;

  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const response = await fetch(
          "https://us-east-2.aws.neurelo.com/rest/users?",
          { headers }
        );
        const data = await response.json();
        if (response.ok) {
          setUsernames(data.data.map((user) => user.username));
        } else {
          throw new Error(data.error || "Failed to fetch usernames");
        }
      } catch (error) {
        alert(error.message);
      }
    };

    fetchUsernames();
  }, []);

  const handleInputChange = (name, value) => {
    setChatData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateChat = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!username) {
      alert("Username is required to create a chat.");
      setLoading(false);
      return;
    }

    const userNamesArray = [username, ...chatData.chat_members].filter(Boolean);

    const body = JSON.stringify({
      chat_name: chatData.chat_name,
      is_group: chatData.is_group === "true",
      user_names: userNamesArray,
    });

    try {
      const response = await fetch(
        "https://us-east-2.aws.neurelo.com/rest/chats/__one",
        {
          method: "POST",
          headers,
          body,
        }
      );
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to create chat");
      }
      window.location.reload();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

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
    <div
      className={`p-4 rounded-md shadow-md ${
        theme === "light" ? "bg-white" : "bg-dark"
      }`}
    >
      <h3
        className={`text-2xl font-semibold mb-4 ${
          theme === "light" ? "text-black" : "text-white"
        }`}
      >
        Create a New Chat
      </h3>
      <form onSubmit={handleCreateChat} className="space-y-4">
        <input
          className={`w-full p-2 rounded-md focus:outline-none ${
            theme === "light"
              ? "bg-gray-100 border-gray-300"
              : "bg-dark-lighter border-dark-lighter"
          }`}
          type="text"
          name="chat_name"
          value={chatData.chat_name}
          placeholder="Chat Name"
          required
          onChange={(e) => handleInputChange("chat_name", e.target.value)}
        />
        <select
          className={`w-full p-2 rounded-md focus:outline-none ${
            theme === "light"
              ? "bg-gray-100 border-gray-300"
              : "bg-dark-lighter border-dark-lighter"
          }`}
          name="is_group"
          value={chatData.is_group}
          onChange={(e) => handleInputChange("is_group", e.target.value)}
          required
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
              backgroundColor: theme === "light" ? "#f5f5f5" : "#2c2c2c",
              borderRadius: "11px",
              border: `2px solid ${theme === "light" ? "#ccc" : "#444"}`,
              padding: "5px",
              ":hover": {
                border: `2px solid ${theme === "light" ? "#000" : "#fff"}`,
              },
              color: theme === "light" ? "#000" : "#fff",
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
              color: theme === "light" ? "#e3342f" : "#e3342f",
              ":hover": {
                backgroundColor: theme === "light" ? "#e3342f" : "#e3342f",
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

        <div className="flex gap-5 items-center mt-5">
          <button
            type="button"
            className={`w-full p-3 rounded-md text-xl ${
              theme === "light"
                ? "bg-gray-200 text-gray-800"
                : "bg-dark-lighter text-white"
            } hover:bg-opacity-80 transition-opacity`}
          >
            Go Back
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded-md text-xl ${
              theme === "light"
                ? "bg-blue-500 text-white"
                : "bg-blue-700 text-white"
            } hover:bg-opacity-80 transition-opacity`}
          >
            {loading ? "Creating ..." : "Create Chat"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddChat;
