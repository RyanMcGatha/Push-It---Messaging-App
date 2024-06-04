import React from "react";
import { useTheme } from "../contexts/ThemeContext";

export const InvalidTokenModal = ({ isOpen, onClose }) => {
  const { theme } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className={`p-8 rounded-md w-96 max-w-full text-center 
        ${theme === "light" ? "bg-white" : "bg-dark"}
      `}
      >
        <h2 className="text-xl font-semibold mb-4">Session Expired</h2>
        <p className="mb-4">
          Your session has expired. Please sign in again to continue using the
          application.
        </p>
        <button
          type="button"
          onClick={() => {
            localStorage.removeItem("selectedNav");
            localStorage.removeItem("session");
            onClose();
            window.location.reload();
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Sign In Again
        </button>
      </div>
    </div>
  );
};
