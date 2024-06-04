import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";
import { VerificationModal } from "../components/VerificationModal";

export const useUserData = () => {
  const [chats, setChats] = useState([]);
  const { session } = useAuth();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fullName, setFullName] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const fetchUserData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://push-it-backend.vercel.app/current-user",
        {
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUsername(data.username);
      setFullName(data.fullname);
      setIsVerified(data.is_verified);
    } catch (error) {
      setError(error);
      console.error("Error fetching signed-in user:", error.message);
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const fetchChats = useCallback(async () => {
    try {
      const response = await fetch("https://push-it-backend.vercel.app/chats", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.token}`,
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
  }, [session]);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  return { chats, username, loading, error, fullName, setChats, isVerified };
};
