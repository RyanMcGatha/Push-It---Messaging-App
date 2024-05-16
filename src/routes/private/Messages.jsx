import React, { useState, useEffect, useRef } from "react";
import { supabase } from "../../../supabaseConfig";
import ChatSettings from "./components/ChatSettings";
import { getUserData, addChat, headers } from "./components/Hooks";
import { useTheme } from "../../ThemeContext"; // Import the useTheme hook

const Messages = ({ selectedChat, userData }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const { username } = addChat();
  const { full_name } = getUserData();
  const containerRef = useRef(null);

  const { theme, toggleTheme } = useTheme(); // Use the theme context

  useEffect(() => {
    const channel = supabase
      .channel(`room.${selectedChat}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public" },
        (payload) => {
          setMessages((prevMessages) => [...prevMessages, payload.new]);
        }
      )
      .subscribe();

    // Cleanup subscription on component unmount
    return () => {
      channel.unsubscribe();
    };
  }, [selectedChat]);

  useEffect(() => {
    const fetchMessages = async () => {
      const selectParams = encodeURIComponent(
        JSON.stringify({
          chat_id: true,
          user_name: true,
          message_text: true,
          timestamp: true,
          full_name: true,
        })
      );
      const filterParams = encodeURIComponent(
        JSON.stringify({ chat_id: Number(selectedChat) })
      );
      const url = `https://us-east-2.aws.neurelo.com/rest/messages?select=${selectParams}&filter=${filterParams}`;

      try {
        const response = await fetch(url, { method: "GET", headers });
        if (!response.ok) throw new Error("Failed to fetch messages");

        const result = await response.json();
        setMessages(result.data);
      } catch (error) {
        console.error("Fetch messages error:", error.message);
      }
    };

    fetchMessages();
  }, [selectedChat]);

  const handleSendMessage = async (event) => {
    event.preventDefault();

    try {
      const body = JSON.stringify({
        chat_id: Number(selectedChat),
        message_text: message,
        user_name: username,
        full_name: full_name,
      });

      const response = await fetch(
        "https://us-east-2.aws.neurelo.com/rest/messages/__one",
        {
          method: "POST",
          headers: headers,
          body: body,
        }
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }
      setMessage("");
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
    try {
      const { error } = await supabase.from("messages").insert({
        chat_id: Number(selectedChat),
        message_text: message,
        user_name: username,
      });
      if (error) {
        console.error("Error inserting message:", error.message);
        return;
      }
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <div
        className={`flex flex-col h-full w-full ${
          theme === "light" ? "bg-white" : "bg-dark text-white"
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between p-4 border-b ${
            theme === "light" ? "border-gray-300" : "border-dark-lighter"
          }`}
        >
          <h2 className="text-xl font-semibold">Messages</h2>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search"
              className={`p-2 border ${
                theme === "light"
                  ? "border-gray-300 bg-white"
                  : "border-dark-lighter bg-dark-lighter"
              } rounded-lg`}
            />
            <button
              className={`p-2 ${
                theme === "light" ? "bg-gray-200" : "bg-dark-lighter"
              } rounded-lg`}
            >
              Search
            </button>
            <button
              onClick={toggleTheme}
              className={`p-2 ${
                theme === "light" ? "bg-gray-200" : "bg-dark-lighter"
              } rounded-lg`}
            >
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>
          </div>
        </div>

        {/* Messages */}
        <div
          ref={containerRef}
          className="flex flex-col overflow-y-scroll no-scrollbar w-full p-5"
          style={{ height: "80%" }}
        >
          {messages.map((msg) => (
            <div
              key={msg.id} // Ensure that msg.id is unique for each message
              className={`${
                msg.user_name === username ? "self-end" : "self-start"
              } p-2 mb-4 rounded-lg w-fit flex flex-col`}
            >
              <div className="flex items-center gap-2">
                <img
                  src={
                    userData.find((user) => user.username === msg.user_name)
                      ?.profile_pic ||
                    `https://ui-avatars.com/api/?name=${username}&background=random&rounded=true&size=128&bold=true&color=fff`
                  }
                  className="w-10 h-10 rounded-full border border-gray-300"
                />
                <p
                  className={`text-sm ${
                    theme === "light" ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  {msg.user_name} -{" "}
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <div>
                <span
                  className={`${
                    msg.user_name === username
                      ? "bg-blue-500 text-white"
                      : theme === "light"
                      ? "bg-gray-200 text-black"
                      : "bg-dark-lighter text-white"
                  } flex w-fit p-2 mt-1 rounded-lg`}
                >
                  <p className="text-lg">{msg.message_text}</p>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <form
          onSubmit={handleSendMessage}
          className={`flex items-center p-4 border-t ${
            theme === "light" ? "border-gray-300" : "border-dark-lighter"
          }`}
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`flex-grow p-2 border ${
              theme === "light"
                ? "border-gray-300 bg-white"
                : "border-dark-lighter bg-dark-lighter"
            } rounded-lg`}
          />
          <button
            type="submit"
            className={`ml-2 p-2 ${
              theme === "light"
                ? "bg-blue-500 text-white"
                : "bg-blue-700 text-white"
            } rounded-lg`}
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default Messages;
