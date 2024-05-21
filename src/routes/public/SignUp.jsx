import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "../../../supabaseConfig";
import { Link, Navigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { twMerge } from "tailwind-merge";
import { useAuth } from "../../AuthContext";
import { headers } from "../private/components/Hooks";

const SignUp = () => {
  const { session } = useAuth();

  return session ? (
    <Navigate to="/home" />
  ) : (
    <div className="bg-zinc-950 py-20 text-zinc-200 selection:bg-zinc-600 w-screen h-screen flex items-center">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.25, ease: "easeInOut" }}
        className="relative z-10 mx-auto w-full max-w-xl p-4"
      >
        <Heading />
        <Form />
      </motion.div>

      <CornerGrid />
    </div>
  );
};

const Heading = () => (
  <div>
    <NavLogo />
    <div className="mb-9 mt-6 space-y-1.5">
      <h1 className="text-2xl font-semibold">Create your account</h1>
      <p className="text-zinc-400">
        Already have an account?{" "}
        <Link to="/" className="text-blue-400">
          Sign In!
        </Link>
      </p>
    </div>
  </div>
);

const Form = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSignUp = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName, username } },
      });

      if (error) throw new Error(error.message);

      await createUserInNeurelo({ email, username, fullName, password });
      window.location.reload();
    } catch (error) {
      console.error("Sign up error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const createUserInNeurelo = async ({
    email,
    username,
    fullName,
    password,
  }) => {
    try {
      const response = await fetch(
        "https://us-east-2.aws.neurelo.com/rest/users/__one",
        {
          method: "POST",
          headers,
          body: JSON.stringify({
            email,
            username,
            fullname: fullName,
            password,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to create user in Neurelo");

      await updateUserProfilePic(username);
    } catch (error) {
      console.error("Request failed:", error.message);
    }
  };

  const updateUserProfilePic = async (username) => {
    try {
      const filterParams = encodeURIComponent(JSON.stringify({ username }));
      const url = `https://us-east-2.aws.neurelo.com/rest/user_profiles?filter=${filterParams}`;

      const response = await fetch(url, {
        method: "PATCH",
        headers,
        body: JSON.stringify({
          profile_pic: `https://ui-avatars.com/api/?name=${username}&background=random&rounded=true&size=128&bold=true&color=fff`,
        }),
      });

      if (!response.ok) throw new Error("Failed to update profile pic");

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error updating profile pic:", error.message);
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <div className="mb-3">
        <label htmlFor="full-name-input" className="mb-1.5 block text-zinc-400">
          Full Name
        </label>
        <input
          id="full-name-input"
          type="text"
          placeholder="Enter your full name"
          className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 placeholder-zinc-500 ring-1 ring-transparent transition-shadow focus:outline-0 focus:ring-blue-700"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="username-input" className="mb-1.5 block text-zinc-400">
          Username
        </label>
        <input
          id="username-input"
          type="text"
          placeholder="Enter a username"
          className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 placeholder-zinc-500 ring-1 ring-transparent transition-shadow focus:outline-0 focus:ring-blue-700"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email-input" className="mb-1.5 block text-zinc-400">
          Email
        </label>
        <input
          id="email-input"
          type="email"
          placeholder="your.email@provider.com"
          className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 placeholder-zinc-500 ring-1 ring-transparent transition-shadow focus:outline-0 focus:ring-blue-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password-input" className="mb-1.5 block text-zinc-400">
          Password
        </label>
        <input
          id="password-input"
          type="password"
          placeholder="••••••••••••"
          className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 placeholder-zinc-500 ring-1 ring-transparent transition-shadow focus:outline-0 focus:ring-blue-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="text-lg text-center flex justify-center gap-1 my-1 w-full">
        Already have an account?
        <Link to="/" className="underline hover:text-blue-400">
          Sign In!
        </Link>
      </div>
      <SplashButton type="submit" className="w-full">
        {loading ? "Signing Up..." : "Sign Up!"}
      </SplashButton>
    </form>
  );
};

const SplashButton = ({ children, className, ...rest }) => {
  return (
    <button
      className={twMerge(
        "rounded-md bg-gradient-to-br from-blue-400 to-blue-700 px-4 py-2 text-lg text-zinc-50 ring-2 ring-blue-500/50 ring-offset-2 ring-offset-zinc-950 transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-blue-500/70",
        className
      )}
      {...rest}
    >
      {children}
    </button>
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

const NavLogo = () => {
  return (
    <img
      width="99"
      height="21"
      viewBox="0 0 99 21"
      src="./pushitt.png"
      alt=""
    />
  );
};

export default SignUp;
