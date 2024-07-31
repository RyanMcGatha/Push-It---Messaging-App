// VerifyEmail.jsx
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetch(`https://push-it-backend.vercel.app/verify-email?token=${token}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            navigate("/home");
          } else {
            console.error("Verification failed:", data.error);
          }
        })
        .catch((error) => {
          console.error("Error verifying email:", error);
        });
    } else {
      console.error("Token not found in URL");
    }
  }, [token, navigate]);

  return (
    <div>
      <h1>Verifying your email...</h1>
      <p>Please wait while we verify your email address.</p>
    </div>
  );
};

export default VerifyEmail;
