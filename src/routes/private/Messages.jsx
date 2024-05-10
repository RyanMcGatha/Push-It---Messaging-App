import React, { useState, useEffect, useRef } from "react";
import { supabase } from "../../../supabaseConfig";
import ChatSettings from "./components/ChatSettings";
import { getUserData, headers } from "./components/Hooks";

const Messages = ({ selectedChat }) => {
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState("");
  const { username } = getUserData();
  const id = selectedChat;

  useEffect(() => {
    <ChatSettings id={id} />;
    const fetchMessages = async () => {
      try {
        const selectParams = encodeURIComponent(
          JSON.stringify({
            chat_id: true,
            user_name: true,
            message_text: true,
            timestamp: true,
          })
        );
        const filterParams = encodeURIComponent(
          JSON.stringify({
            chat_id: Number(id),
          })
        );

        const url = `https://us-east-2.aws.neurelo.com/rest/messages?select=${selectParams}&filter=${filterParams}`;

        const response = await fetch(url, {
          method: "GET",
          headers,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }

        const result = await response.json();
        setMessages(result.data);
      } catch (error) {
        console.error(
          "There was a problem with your fetchMessages operation:",
          error
        );
      }
    };
    fetchMessages();
  }, [id]);
  const handleSendMessage = async (event) => {
    event.preventDefault();

    try {
      const body = JSON.stringify({
        chat_id: Number(id),
        message_text: message,
        user_name: username,
      });

      const response = await fetch(
        "https://us-east-2.aws.neurelo.com/rest/messages/__one",
        {
          method: "POST",
          headers,
          body: body,
        }
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      setMessage("");
    } catch (error) {
      console.error(
        "There was a problem with your handleSendMessage operation:",
        error
      );
    }
    try {
      const { error } = await supabase.from("messages").insert({
        chat_id: Number(id),
        message_text: message,
        user_name: username,
      });
      if (error) {
        console.error("Error inserting message to supabase:", error.message);
        return;
      }
    } catch (error) {
      console.error(
        "There was a problem with your supabase insert operation:",
        error
      );
    }
  };

  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <>
      <div className="bg-eucalyptus-950 flex flex-col gap-4 sm:gap-6 md:gap-10 text-eucalyptus-200 overflow-hidden h-full w-full">
        <div
          className="flex flex-col bg-eucalyptus-900 items-center gap-2 p-2 sm:p-4 md:p-2 no-scrollbar text-xl sm:text-2xl md:text-3xl "
          style={{
            maxWidth: "100%",
            width: "100%",
            height: "75vh",
            overflowY: "scroll",
          }}
        >
          <h2>Messages</h2>
          <div
            className="w-full flex flex-col gap-2 overflow-y-auto"
            ref={containerRef}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className="p-5 w-full bg-eucalyptus-800 flex flex-col rounded-md"
              >
                <div className="text-xl sm:text-2xl md:text-3xl">
                  <span className="p-1 flex flex-col gap-2 items-start">
                    <span className="">Message:</span>
                    <span className="capitalize text-5xl pl-1">
                      {msg.message_text}
                    </span>
                  </span>
                </div>

                <div className="text-lg sm:text-xl md:text-xl pt-5">
                  <span className="p-1 flex items-center justify-end">
                    <a className="p-1">Sent by:</a>
                    <a className="capitalize ">{msg.user_name}</a>
                  </span>
                  <span className="p-1 flex items-center justify-end">
                    <a className="p-1">Sent at:</a>
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <form className="flex gap-2 h-20" onSubmit={handleSendMessage}>
          <input
            type="text"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="bg-eucalyptus-800 rounded-md text-xl sm:text-2xl md:text-3xl w-full p-3"
            placeholder="Type your message here"
          />
          <button
            type="submit"
            className="bg-eucalyptus-800 p-2 sm:p-3 md:p-3 rounded-md text-xl sm:text-2xl md:text-3xl w-auto sm:w-80 md:w-96"
          >
            Push It!
          </button>
        </form>
      </div>
    </>
  );
};

export default Messages;
