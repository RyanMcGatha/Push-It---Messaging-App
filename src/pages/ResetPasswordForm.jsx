import React, { useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const ResetPasswordForm = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleResetPassword = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "https://push-it-backend.vercel.app/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, newPassword }),
        }
      );

      if (!response.ok) {
        const res = await response.json();
        throw new Error(res.message);
      }

      setSuccess(
        "Password reset successfully. You can now log in with your new password."
      );
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="bg-zinc-950 py-20 text-zinc-200 selection:bg-zinc-600 w-screen h-screen flex items-center">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.25, ease: "easeInOut" }}
        className="relative z-10 mx-auto w-full max-w-xl p-4"
      >
        <Heading />
        <form onSubmit={handleResetPassword} className="space-y-6">
          <div>
            <label htmlFor="newPassword" className="block text-zinc-400">
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              placeholder="New Password"
              className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 placeholder-zinc-500 ring-1 ring-transparent transition-shadow focus:outline-none focus:ring-blue-700"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-zinc-400">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 placeholder-zinc-500 ring-1 ring-transparent transition-shadow focus:outline-none focus:ring-blue-700"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          <button
            type="submit"
            className="w-full rounded-md bg-gradient-to-br from-blue-400 to-blue-700 px-4 py-2 text-lg text-zinc-50 ring-2 ring-blue-500/50 ring-offset-2 ring-offset-zinc-950 transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-blue-500/70"
          >
            Reset Password
          </button>
        </form>
      </motion.div>
      <CornerGrid />
    </div>
  );
};

const Heading = () => (
  <div>
    <NavLogo />
    <div className="mb-9 mt-6 space-y-1.5">
      <h1 className="text-2xl font-semibold">Reset your password</h1>
      <p className="text-zinc-400">
        Remembered your password?{" "}
        <Link to="/signin" className="text-blue-400">
          Sign in.
        </Link>
      </p>
    </div>
  </div>
);

const NavLogo = () => {
  return (
    <img
      width="99"
      height="21"
      viewBox="0 0 99 21"
      src="./pushitt.png"
      alt="Logo"
    />
  );
};

const CornerGrid = () => {
  return (
    <div
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='rgb(30 58 138 / 0.5)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
      }}
      className="absolute right-0 top-0 z-0 size-[50vw]"
    >
      <div
        style={{
          backgroundImage:
            "radial-gradient(100% 100% at 100% 0%, rgba(9,9,11,0), rgba(9,9,11,1))",
        }}
        className="absolute inset-0"
      />
    </div>
  );
};

export default ResetPasswordForm;
