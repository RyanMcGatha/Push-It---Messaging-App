import { useState, useEffect, useCallback } from "react";
import { useUserData } from "./useUserData";

export const useAddChat = () => {
  const [loading, setLoading] = useState(false);
  const [usernames, setUsernames] = useState([]);
  const { username } = useUserData();
  const [chatData, setChatData] = useState({
    chat_name: "",
    is_group: false,
    chat_members: [],
  });

  const fetchUsernames = useCallback(async () => {
    try {
      const response = await fetch(
        "https://push-it-backend.vercel.app/usernames",
        {
          method: "GET",
        }
      );
      const data = await response.json();
      if (response.ok) {
        setUsernames(data.map((user) => user.username));
      } else {
        throw new Error(data.error || "Failed to fetch usernames");
      }
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    fetchUsernames();
  }, [fetchUsernames]);

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
      const response = await fetch(
        "https://push-it-backend.vercel.app/add-chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body,
        }
      );
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to create chat");
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
      window.location.reload();
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
