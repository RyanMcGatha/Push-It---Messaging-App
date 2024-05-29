import { json } from "react-router-dom";
import { supabase } from "../../../../supabaseConfig";
import { apiKey } from "../../../../supabaseConfig";
import React, { useState, useEffect } from "react";

const token = localStorage.getItem("session");

export const headers = {
  "Content-Type": "application/json",
  "X-API-KEY": apiKey,
};

export const getUserData = () => {
  const [chats, setChats] = useState([]);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [full_name, setFullName] = useState("");
  const [id, setId] = useState(null);

  useEffect(() => {
    setLoading(true);
    const getUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/current-user", {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUsername(data.username);
        setFullName(data.fullname);
      } catch (error) {
        setError(error);
        console.error("Error fetching signed-in user:", error.message);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/chats", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch chats");
        }
        const data = await response.json();
        setChats(data);
      } catch (error) {
        setError(error);
        console.error("There was a problem fetching chats:", error);
      }
    };

    fetchData();
  }, [username, full_name]);

  return { chats, username, loading, error, full_name, setChats };
};

export const useUser = () => {
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(null);
  const { username } = getUserData();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/user-profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch user profile");
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        setError(error);
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, [username]);

  return { userData, error };
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
      const response = await fetch("http://localhost:3000/usernames", {
        method: "GET",
      });
      const data = await response.json();
      if (response.ok) {
        setUsernames(data.map((user) => user.username));
      } else {
        throw new Error(data.error || "Failed to fetch usernames");
      }
    } catch (error) {
      console.log(error.message);
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
      is_group: chatData.is_group,
      user_names: [username, ...chatData.chat_members],
    });

    try {
      const response = await fetch("http://localhost:3000/add-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to create chat");
      }
    } catch (error) {
      console.log(error.message);
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
