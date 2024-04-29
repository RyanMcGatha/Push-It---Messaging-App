import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import { supabase } from "../../../supabaseConfig";
import { useParams } from "react-router-dom";

const OneOnOne = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState("");
  console.log(messages);

  const sendMessage = async (event) => {
    event.preventDefault();
    if (!message) return;

    try {
      const response = await fetch(
        `https://us-east-2.aws.neurelo.com/rest/messages/__one`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY":
              "neurelo_9wKFBp874Z5xFw6ZCfvhXVDJ+LiTxRH5g8EIPHIltF4eJyUkIkPuZa28E/j27n4p7g78sodDoNFVybTx3GuBXAQY2QFUoXUQQff3EYC8Yp9b0HY1CmFBYQQQYKrKXWHzocwrP/W6PeIG+R8mwaPKJ/Q0YH42gsX2Pm2oNj1LpgHkX6CinOF6GPzXyftO88Hm_6WDq3T3BsqUg5xLhWKkSs5N9zZ4PXT+Y+THHalGqfb8=",
          },
          body: JSON.stringify({
            chat_id: id,
            message_text: message,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to post message");
      }

      const data = await response.json();
      setMessages([...messages, data]);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://us-east-2.aws.neurelo.com/custom/findMsg?chat_id=${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "X-API-KEY":
                "neurelo_9wKFBp874Z5xFw6ZCfvhXVDJ+LiTxRH5g8EIPHIltF4eJyUkIkPuZa28E/j27n4p7g78sodDoNFVybTx3GuBXAQY2QFUoXUQQff3EYC8Yp9b0HY1CmFBYQQQYKrKXWHzocwrP/W6PeIG+R8mwaPKJ/Q0YH42gsX2Pm2oNj1LpgHkX6CinOF6GPzXyftO88Hm_6WDq3T3BsqUg5xLhWKkSs5N9zZ4PXT+Y+THHalGqfb8=",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }
        const result = await response.json();
        console.log("Fetched data:", result.data);
        setMessages(result.data || []);
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
      }
    };

    fetchData();

    const getUser = async () => {
      const { data: user, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
        return;
      }
      setUserData(user.user);
    };

    getUser();
  }, [id]);

  return (
    <>
      <div
        className="bg-eucalyptus-950 flex flex-col p-10 gap-10 text-eucalyptus-200 overflow-hidden"
        style={{ maxWidth: "85vw", width: "85vw" }}
      >
        <div
          className="flex flex-col bg-eucalyptus-900 items-center gap-2 p-2 no-scrollbar text-3xl"
          style={{
            maxWidth: "80vw",
            width: "80vw",
            height: "65vh",
            overflowY: "scroll",
          }}
        >
          <h2>Messages</h2>
          <div className="w-full flex flex-col gap-2">
            {messages.map((msg) => (
              <div
                key={msg.message_id}
                className="p-2 w-full bg-eucalyptus-800 flex flex-col gap-1 rounded-md"
              >
                <div className="text-xl">
                  Message: <span className="p-1">{msg.message_text}</span>
                </div>
                {userData && (
                  <div className="text-xl flex justify-end px-5">
                    Sent by: <span className="pl-1">{userData.email}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="bg-eucalyptus-800 rounded-md text-3xl w-full p-3"
            placeholder="Type your message here"
          />
          <button className="bg-eucalyptus-800 p-3 rounded-md text-3xl w-96">
            Push It!
          </button>
        </form>
      </div>
    </>
  );
};

export default OneOnOne;
