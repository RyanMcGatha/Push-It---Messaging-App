import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import OnesCard from "./components/OnesCard";
import AddChat from "./components/AddChat";
import { supabase } from "../../../supabaseConfig";

const Home = () => {
  const [chats, setChats] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error getting user:", error.message);
        return;
      }
      setUsername(data.user.user_metadata.username);
    };

    getUser();
  }, []);

  useEffect(() => {
    if (username) {
      // Only fetch chats if the username is known
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
          // Filter chats to include only those that have the current user's username
          const relevantChats = data.filter((chat) =>
            chat.user_names.includes(username)
          );
          setChats(relevantChats);
        } catch (error) {
          console.error(
            "There was a problem with your fetch operation:",
            error
          );
        }
      };

      fetchData();
    }
  }, [username]); // Depend on username so we refetch whenever it changes

  return (
    <>
      <div
        className="bg-eucalyptus-950 flex flex-col p-5 overflow-scroll max-h-screen"
        style={{ maxWidth: "85vw", width: "85vw" }}
      >
        <div className="flex items-center w-full justify-end">
          <AddChat username={username} />
        </div>

        <div>
          <h1 className="text-6xl text-eucalyptus-200 mt-5">
            Recent one on one's
          </h1>
          <div className="h-full flex items-center p-7 gap-5 ">
            {chats
              .filter((chat) => !chat.is_group)
              .map((chat) => (
                <OnesCard
                  key={chat.chat_id}
                  title={chat.chat_name}
                  id={chat.chat_id}
                  usernames={chat.user_names}
                />
              ))}
          </div>
        </div>
        <div className="mb-20">
          <h1 className="text-6xl text-eucalyptus-200 mt-5">Recent Groups</h1>
          <div className="h-full flex items-center p-7 gap-5 ">
            {chats
              .filter((chat) => chat.is_group)
              .map((chat) => (
                <OnesCard
                  key={chat.chat_id}
                  title={chat.chat_name}
                  id={chat.chat_id}
                  usernames={chat.user_names}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
