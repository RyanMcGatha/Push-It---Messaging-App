import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (token) {
      fetch(`https://push-it-backend.vercel.app/verify-email?token=${token}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.user && data.user.is_verified) {
            setMessage("Email verified successfully. Redirecting to home...");
            setTimeout(() => navigate("/home"), 2000); // Redirect after 2 seconds
          } else {
            setMessage(
              "Invalid or expired token. Please request a new verification email."
            );
          }
        })
        .catch((error) => {
          console.error("Error verifying email:", error);
          setMessage(
            "An error occurred during verification. Please try again later."
          );
        });
    } else {
      setMessage("No token provided. Please check the verification link.");
    }
  }, [token, navigate]);

  return (
    <div>
      <h1>Email Verification</h1>
      <p>{message}</p>
    </div>
  );
};

export default VerifyEmail;
