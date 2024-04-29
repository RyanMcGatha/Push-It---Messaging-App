import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import OnesCard from "./components/OnesCard";
import AddChat from "./components/AddChat";

const Home = () => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://us-east-2.aws.neurelo.com/rest/chats",
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
          throw new Error("Network response was not ok");
        }
        const { data } = await response.json();
        setChats(data);
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div
        className="bg-eucalyptus-950 relative min-h-screen flex flex-col p-10 gap-10"
        style={{ maxWidth: "85vw", width: "85vw" }}
      >
        {/* <div>
          <h1 className="text-6xl text-eucalyptus-200">Pinned Convos</h1>
          <div className="h-full flex items-center p-7 gap-5">
            {chats.map((chat) => (
              <OnesCard
                key={chat.chat_id}
                title={chat.chat_name}
                id={chat.chat_id}
              />
            ))}
          </div>
        </div> */}
        <div>
          <h1 className="text-6xl text-eucalyptus-200">Recent one on one's</h1>
          <div className="h-full flex items-center p-7 gap-5">
            {chats.map((chat) => (
              <OnesCard
                key={chat.chat_id}
                title={chat.chat_name}
                id={chat.chat_id}
              />
            ))}
          </div>
        </div>
        {/* <div>
          <h1 className="text-6xl text-eucalyptus-200">Recent Groups</h1>
          <div className="h-full flex items-center p-7 gap-5">
            {chats.map((chat) => (
              <OnesCard
                key={chat.chat_id}
                title={chat.chat_name}
                id={chat.chat_id}
              />
            ))}
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Home;
