import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (status !== null) {
    }
  }, [status]);

  useEffect(() => {
    const savedSession = JSON.parse(localStorage.getItem("session"));
    if (savedSession) {
      setSession(savedSession);
    }
    setLoading(false);
  }, []);

  const signUp = async (email, username, fullName, password) => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://push-it-backend.vercel.app/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            username,
            fullname: fullName,
            password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Sign up failed");
      }

      const data = await response.json();
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resendVerificationEmail = async () => {
    try {
      const response = await fetch(
        "https://push-it-backend.vercel.app/resend-verification",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.token}`,
          },
          body: JSON.stringify({ username: session.user.username }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to resend verification email");
      }

      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error("Error resending verification email:", error);
      alert("Error resending verification email. Please try again later.");
    }
  };

  const login = async (username, password) => {
    setLoading(true);
    try {
      const response = await fetch("https://push-it-backend.vercel.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      setStatus(response.status);

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      setSession(data);
      localStorage.setItem("session", JSON.stringify(data));
      window.location.reload();
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setSession(null);
    localStorage.removeItem("session");
    window.location.reload();
  };

  const verifyEmail = async (token) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://push-it-backend.vercel.app/verify-email?token=${token}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Email verification failed");
      }

      const updatedSession = await response.json();
      setSession(updatedSession);
      localStorage.setItem("session", JSON.stringify(updatedSession));
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        resendVerificationEmail,
        login,
        logout,
        signUp,
        verifyEmail,
        status,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
