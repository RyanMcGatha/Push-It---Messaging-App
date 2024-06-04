import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";

export const useUserProfile = () => {
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(null);
  const { session } = useAuth();

  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await fetch(
        "https://push-it-backend.vercel.app/user-profile",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch user profile");
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      setError(error);
      console.error("Failed to fetch user:", error);
    }
  }, [session]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  return { userData, error };
};
