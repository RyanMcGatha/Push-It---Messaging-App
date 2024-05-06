import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../supabaseConfig";
import { interpolate } from "framer-motion";
import { createClient } from "@supabase/supabase-js";

const OneOnOne = () => {
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  console.log(messages);
  const [channel, setChannel] = useState(null);
  const { id, usernames } = useParams();
  useEffect(() => {
    const channel = supabase.channel(`room-${id}`, {
      config: {
        broadcast: { self: true, ack: "true" },
      },
    });

    channel.on("broadcast", { event: "new-message" }, (payload) =>
      setMessages([...messages, payload.message])
    );

    channel
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages" },
        (payload) => {
          handleSendMessage(payload);
        }
      )
      .subscribe();

    setChannel(channel);

    return () => {
      channel.unsubscribe();
      setChannel(null);
    };
  }, [id]);

  const apiHeaders = {
    "Content-Type": "application/json",
    "X-API-KEY":
      "neurelo_9wKFBp874Z5xFw6ZCfvhXVDJ+LiTxRH5g8EIPHIltF4eJyUkIkPuZa28E/j27n4p7g78sodDoNFVybTx3GuBXAQY2QFUoXUQQff3EYC8Yp9b0HY1CmFBYQQQYKrKXWHzocwrP/W6PeIG+R8mwaPKJ/Q0YH42gsX2Pm2oNj1LpgHkX6CinOF6GPzXyftO88Hm_6WDq3T3BsqUg5xLhWKkSs5N9zZ4PXT+Y+THHalGqfb8=",
  };

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const selectParams = encodeURIComponent(
    //       JSON.stringify({
    //         chat_id: true,
    //         user_name: true,
    //         message_text: true,
    //         timestamp: true,
    //       })
    //     );

    //     const filterParams = encodeURIComponent(
    //       JSON.stringify({
    //         chat_id: Number(id),
    //       })
    //     );

    //     const url = `https://us-east-2.aws.neurelo.com/rest/messages?select=${selectParams}&filter=${filterParams}`;

    //     const response = await fetch(url, {
    //       method: "GET",
    //       headers: {
    //         "X-API-KEY":
    //           "neurelo_9wKFBp874Z5xFw6ZCfvhXVDJ+LiTxRH5g8EIPHIltF4eJyUkIkPuZa28E/j27n4p7g78sodDoNFVybTx3GuBXAQY2QFUoXUQQff3EYC8Yp9b0HY1CmFBYQQQYKrKXWHzocwrP/W6PeIG+R8mwaPKJ/Q0YH42gsX2Pm2oNj1LpgHkX6CinOF6GPzXyftO88Hm_6WDq3T3BsqUg5xLhWKkSs5N9zZ4PXT+Y+THHalGqfb8=",
    //         "Content-Type": "application/json",
    //       },
    //     });

    //     if (!response.ok) {
    //       throw new Error("Failed to fetch messages");
    //     }

    //     const result = await response.json();
    //     setMessages(result.data);
    //   } catch (error) {
    //     console.error("There was a problem with your fetch operation:", error);
    //   }
    // };
    // fetchData();

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("chat_id", id);

      if (error) {
        console.error("Error fetching messages:", error.message);
      } else {
        setMessages(data);
      }
    };

    fetchMessages();

    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error getting user:", error.message);
        return;
      }
      setUserData(data);
      setUsername(data.user.user_metadata.full_name);
    };

    getUser();
  }, [id]);

  const handleSendMessage = async (event) => {
    event.preventDefault();

    // try {
    //   const body = JSON.stringify({
    //     chat_id: Number(id),
    //     message_text: message,
    //     user_name: username,
    //   });

    //   const response = await fetch(
    //     "https://us-east-2.aws.neurelo.com/rest/messages/__one",
    //     {
    //       method: "POST",
    //       headers: apiHeaders,
    //       body: body,
    //     }
    //   );

    //   const result = await response.json();
    //   if (!response.ok) {
    //     throw new Error(result.error || "Failed to send message");
    //   }

    //   setMessages([...messages, result.data]);
    //   setMessage("");
    // } catch (error) {
    //   console.error("There was a problem with your fetch operation:", error);
    // }
  };

  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <div className="bg-eucalyptus-950 flex flex-col p-4 sm:p-8 md:p-10 gap-4 sm:gap-6 md:gap-10 text-eucalyptus-200 overflow-hidden h-screen">
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
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="p-5 w-full bg-eucalyptus-800 flex flex-col rounded-md"
              >
                <div className="text-xl sm:text-2xl md:text-3xl">
                  <span className="p-1 flex flex-col gap-2 items-start">
                    <a className="">Message:</a>
                    <a className="capitalize text-5xl pl-1">{msg.messages}</a>
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

export default OneOnOne;
