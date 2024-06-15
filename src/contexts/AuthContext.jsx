import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (status !== null) {
      // Handle status change if needed
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
      const response = await axios.post(
        "https://push-it-backend.vercel.app/register",
        { email, username, fullname: fullName, password }
      );

      if (response.status !== 201) {
        throw new Error("Sign up failed");
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resendVerificationEmail = async () => {
    try {
      const response = await axios.post(
        "https://push-it-backend.vercel.app/resend-verification",
        { username: session.user.username },
        { headers: { Authorization: `Bearer ${session.token}` } }
      );

      if (response.status !== 200) {
        throw new Error("Failed to resend verification email");
      }

      console.log(response.data.message);
    } catch (error) {
      console.error("Error resending verification email:", error);
      alert("Error resending verification email. Please try again later.");
    }
  };

  const login = async (username, password) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://push-it-backend.vercel.app/login",
        { username, password }
      );
      setStatus(response.status);

      if (response.status !== 200) {
        throw new Error("Login failed");
      }

      const data = response.data;
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
      const response = await axios.get(
        `https://push-it-backend.vercel.app/verify-email?token=${token}`
      );

      if (response.status !== 200) {
        throw new Error("Email verification failed");
      }

      const updatedSession = response.data;
      setSession(updatedSession);
      localStorage.setItem("session", JSON.stringify(updatedSession));
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const requestPasswordReset = async (email) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://push-it-backend.vercel.app/request-password-reset",
        { email }
      );

      if (response.status !== 200) {
        throw new Error("Failed to send password reset link");
      }

      console.log(response.data.message);
    } catch (error) {
      console.error("Error sending password reset link:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (token, newPassword) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://push-it-backend.vercel.app/reset-password",
        { token, newPassword }
      );

      if (response.status !== 200) {
        throw new Error("Password reset failed");
      }

      console.log(response.data.message);
    } catch (error) {
      console.error("Error resetting password:", error);
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
        requestPasswordReset,
        resetPassword,
        status,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
