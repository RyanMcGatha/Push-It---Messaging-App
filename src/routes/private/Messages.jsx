import React, { useState, useEffect, useRef } from "react";
import { supabase } from "../../../supabaseConfig";
import ChatSettings from "./components/ChatSettings";
import { getUserData, addChat, headers } from "./components/Hooks";
import { RiChat1Fill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";

const Messages = ({ selectedChat }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const { username } = addChat();
  const { full_name } = getUserData();
  const containerRef = useRef(null);

  const channel = supabase
    .channel(`room.${selectedChat}`)
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public" },
      (payload) => {
        setMessages((prevMessages) => [...prevMessages, payload.new]);
      }
    );
  channel.subscribe();

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
      <div className="flex flex-col h-full justify-between overflow-hidden pb-2">
        <div
          ref={containerRef}
          className="flex flex-col overflow-y-scroll no-scrollbar w-full px-5"
          style={{ height: "93%" }}
        >
          {messages.map((msg) => (
            <div
              key={msg.id} // Ensure that msg.id is unique for each message
              className={`${
                msg.user_name === username ? "self-end" : "self-start"
              } p-2 rounded-lg w-[fit-content] flex flex-col`}
            >
              <div className="bg-transparent flex items-center gap-1 text-eucalyptus-200">
                <CgProfile className="text-2xl text-eucalyptus-800" />
                <p className="text-xs text-right">
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
                      ? "bg-eucalyptus-400"
                      : " bg-neutral-900"
                  } flex w-fit relative p-2 left-5 rounded-tr-lg rounded-br-lg rounded-bl-lg rounded-tl-none`}
                >
                  <p className="text-lg">{msg.message_text}</p>
                </span>
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={handleSendMessage}
          className="flex justify-between border-t-[1px] border-eucalyptus-400"
          style={{ height: "7%" }}
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 border-eucalyptus-400 border-[1px] rounded-lg"
          />
          <button
            type="submit"
            className="bg-eucalyptus-400 text-white p-2 rounded-lg"
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default Messages;
