import { supabase } from "../../../../supabaseConfig";
import { apiKey } from "../../../../supabaseConfig";
import React, { useState, useEffect } from "react";

export const headers = {
  "Content-Type": "application/json",
  "X-API-KEY": apiKey,
};

export const getUserData = () => {
  const [chats, setChats] = useState([]);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [full_name, setFull_name] = useState("");
  const [id, setId] = useState(null);

  useEffect(() => {
    setLoading(true);
    const getUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) throw error;
        setUsername(data.user.user_metadata.username);
        setFull_name(data.user.user_metadata.full_name);
      } catch (error) {
        setError(error);
        console.error("Error fetching signed in user:", error.message);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://us-east-2.aws.neurelo.com/rest/chats",
          {
            method: "GET",
            headers,
          }
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const { data } = await response.json();
        setChats(data.filter((chat) => chat.user_names.includes(username)));
      } catch (error) {
        setError(error);
        console.error("There was a problem fetching chats:", error);
      }
    };

    fetchData();
  }, [username, full_name]);

  return { chats, username, loading, error, full_name };
};

export const addChat = () => {
  const [loading, setLoading] = useState(false);
  const [usernames, setUsernames] = useState([]);
  const { username } = getUserData();
  const [chatData, setChatData] = useState({
    chat_name: "",
    is_group: false,
    chat_members: [],
  });

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

  useEffect(() => {
    fetchUsernames();
  }, []);

  const handleInputChange = (name, value) => {
    setChatData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateChat = async (event) => {
    event.preventDefault();
    setLoading(true);
    const body = JSON.stringify({
      chat_name: chatData.chat_name,
      is_group: chatData.is_group === "true",
      user_names: [username, ...chatData.chat_members],
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

  return {
    loading,
    handleCreateChat,
    chatData,
    handleInputChange,
    usernames,

    username,
  };
};
