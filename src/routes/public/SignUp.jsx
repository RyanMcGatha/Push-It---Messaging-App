import { useAnimate } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

import { useAuth } from "../../AuthContext";
import { supabase } from "../../../supabaseConfig";
import { Link, Navigate, redirect } from "react-router-dom";

const SignUp = () => {
  const { session } = useAuth();
  return session ? (
    <Navigate to={"/home"} />
  ) : (
    <MouseImageTrail
      renderImageBuffer={50}
      rotationRange={25}
      images={[
        "pushitt.png",
        "pushitt.png",
        "pushitt.png",
        "pushitt.png",
        "pushitt.png",
        "pushitt.png",
        "pushitt.png",
        "pushitt.png",
        "pushitt.png",
        "pushitt.png",
        "pushitt.png",
        "pushitt.png",
        "pushitt.png",
        "pushitt.png",
        "pushitt.png",
        "pushitt.png",
      ]}
    >
      <section className="h-screen bg-eucalyptus-950">
        <Copy />

        <WatermarkWrapper />
      </section>
    </MouseImageTrail>
  );
};

const Copy = () => {
  return (
    <section className="z-[999999] fixed flex flex-col w-screen h-screen items-center md:justify-center gap-10">
      <Logo />

      <Form />
    </section>
  );
};

const Form = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          username: username,
        },
      },
    });
    if (data) {
      try {
        const response = await fetch(
          "https://us-east-2.aws.neurelo.com/rest/users/__one",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-API-KEY":
                "neurelo_9wKFBp874Z5xFw6ZCfvhXVDJ+LiTxRH5g8EIPHIltF4eJyUkIkPuZa28E/j27n4p7g78sodDoNFVybTx3GuBXAQY2QFUoXUQQff3EYC8Yp9b0HY1CmFBYQQQYKrKXWHzocwrP/W6PeIG+R8mwaPKJ/Q0YH42gsX2Pm2oNj1LpgHkX6CinOF6GPzXyftO88Hm_6WDq3T3BsqUg5xLhWKkSs5N9zZ4PXT+Y+THHalGqfb8=",
            },
            body: JSON.stringify({
              email: email,
              username: username,
              fullname: fullName,
              password: password,
            }),
          }
        );
        const data = await response.json();

        if (data.error) {
          console.log(data.error);
        } else {
          window.location.reload();
        }
      } catch (error) {
        console.error("Request failed", error);
      }
    } else {
      console.log(error.error_description || error.message);
    }

    setLoading(false);
  };

  return (
    <>
      <div className="scale-95 md:scale-110 lg:scale-125 xl:scale-[1.8]">
        <motion.div
          initial="initial"
          whileInView="animate"
          transition={{
            staggerChildren: 0.05,
          }}
          viewport={{ once: true }}
          className="rounded-xl bg-eucalyptus-950 border-eucalyptus-400 border-[1px] font-semibold"
          style={{
            backgroundAttachment: "fixed",
            backdropFilter: "blur(15px)",
          }}
        >
          <div className="mx-auto my-auto p-10 text-eucalyptus-200 ">
            <motion.h1
              variants={primaryVariants}
              className=" p-2 text-center text-4xl font-semibold"
            >
              Sign Up!
            </motion.h1>
            <motion.p
              variants={primaryVariants}
              className="p-2 text-center text-xl font-semibold"
            >
              Sign up and just Push It!
            </motion.p>

            <form onSubmit={handleLogin} className="w-full">
              <motion.div variants={primaryVariants} className="mb-2 w-full">
                <label
                  htmlFor="full-name-input"
                  className="mb-1 inline-block text-sm font-medium"
                >
                  Full Name<span className="p-1 text-red-500">*</span>
                </label>
                <input
                  id="full-name-input"
                  type="name"
                  placeholder="Enter your full name"
                  className="w-full rounded border-[1px] px-2.5 py-1.5 focus:outline-eucalyptus-700 bg-eucalyptus-950 border-eucalyptus-400 font-semibold placeholder-eucalyptus-200"
                  required
                  value={fullName}
                  autoComplete="Full Name"
                  onChange={(event) => setFullName(event.target.value)}
                />
              </motion.div>
              <motion.div variants={primaryVariants} className="mb-2 w-full">
                <label
                  htmlFor="Username-input"
                  className="mb-1 inline-block text-sm font-medium"
                >
                  Username<span className="p-1 text-red-500">*</span>
                </label>
                <input
                  id="username-input"
                  type="username"
                  placeholder="Enter a username"
                  className="w-full rounded border-[1px] px-2.5 py-1.5 focus:outline-eucalyptus-700 bg-eucalyptus-950 border-eucalyptus-400 font-semibold placeholder-eucalyptus-200"
                  required
                  value={username}
                  autoComplete="username"
                  onChange={(event) => setUsername(event.target.value)}
                />
              </motion.div>
              <motion.div variants={primaryVariants} className="mb-2 w-full">
                <label
                  htmlFor="email-input"
                  className="mb-1 inline-block text-sm font-medium"
                >
                  Email<span className="p-1 text-red-500">*</span>
                </label>
                <input
                  id="email-input"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded border-[1px] px-2.5 py-1.5 focus:outline-eucalyptus-700 bg-eucalyptus-950 border-eucalyptus-400 font-semibold placeholder-eucalyptus-200"
                  required
                  value={email}
                  autoComplete="email"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </motion.div>

              <motion.div variants={primaryVariants} className="mb-2 w-full">
                <label
                  htmlFor="password-input"
                  className="mb-1 inline-block text-sm font-medium"
                >
                  Password<span className=" pl-1 text-red-500">*</span>
                </label>
                <input
                  id="password-input"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full rounded border-[1px] px-2.5 py-1.5 focus:outline-eucalyptus-700 bg-eucalyptus-950 border-eucalyptus-400 font-semibold placeholder-eucalyptus-200"
                  required
                  value={password}
                  autoComplete="current-password"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </motion.div>
              <div className="text-xs text-center flex justify-center gap-1">
                Already have an account?
                <Link to={"/"} className=" underline hover:text-eucalyptus-800">
                  Sign In!
                </Link>
              </div>

              <motion.button
                variants={primaryVariants}
                whileTap={{ scale: 0.985 }}
                type="submit"
                className=" w-full rounded bg-eucalyptus-800 px-4 py-2 text-center font-semibold text-lg text-eucalyptus-100 transition-colors hover:bg-eucalyptus-900 mt-1"
              >
                Sign Up!
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  );
};

const Logo = () => {
  return (
    <img
      src="pushitSlogan.png"
      alt="Sully's Logo"
      className=" w-52 h-auto md:fixed md:left-5 md:top-5"
    />
  );
};

const primaryVariants = {
  initial: {
    y: 55,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
};

const WatermarkWrapper = () => {
  return (
    <>
      <Watermark text="Push It! Push It!" />
      <Watermark text="Push It! Push It!" reverse />
      <Watermark text="Push It! Push It!" />
      <Watermark text="Push It! Push It!" reverse />
      <Watermark text="Push It! Push It!" />
      <Watermark text="Push It! Push It!" reverse />
      <Watermark text="Push It! Push It!" />
      <Watermark text="Push It! Push It!" reverse />
    </>
  );
};

const Watermark = ({ reverse, text }) => (
  <div className="flex -translate-y-12 select-none overflow-hidden">
    <TranslateWrapper reverse={reverse}>
      <span className="w-fit whitespace-nowrap text-[17vmax] font-black uppercase leading-[0.75] text-eucalyptus-900">
        {text}
      </span>
    </TranslateWrapper>
    <TranslateWrapper reverse={reverse}>
      <span className="ml-48 w-fit whitespace-nowrap text-[17vmax] font-black uppercase leading-[0.75] text-eucalyptus-900">
        {text}
      </span>
    </TranslateWrapper>
  </div>
);

const TranslateWrapper = ({ children, reverse }) => {
  return (
    <motion.div
      initial={{ translateX: reverse ? "-100%" : "0%" }}
      animate={{ translateX: reverse ? "0%" : "-100%" }}
      transition={{ duration: 75, repeat: Infinity, ease: "linear" }}
      className="flex"
    >
      {children}
    </motion.div>
  );
};

const MouseImageTrail = ({
  children,

  images,

  renderImageBuffer,

  rotationRange,
}) => {
  const [scope, animate] = useAnimate();

  const lastRenderPosition = useRef({ x: 0, y: 0 });
  const imageRenderCount = useRef(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;

    const distance = calculateDistance(
      clientX,
      clientY,
      lastRenderPosition.current.x,
      lastRenderPosition.current.y
    );

    if (distance >= renderImageBuffer) {
      lastRenderPosition.current.x = clientX;
      lastRenderPosition.current.y = clientY;

      renderNextImage();
    }
  };

  const calculateDistance = (x1, y1, x2, y2) => {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;

    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    return distance;
  };

  const renderNextImage = () => {
    const imageIndex = imageRenderCount.current % images.length;
    const selector = `[data-mouse-move-index="${imageIndex}"]`;

    const el = document.querySelector(selector);

    el.style.top = `${lastRenderPosition.current.y}px`;
    el.style.left = `${lastRenderPosition.current.x}px`;
    el.style.zIndex = imageRenderCount.current.toString();

    const rotation = Math.random() * rotationRange;

    animate(
      selector,
      {
        opacity: [0, 1],
        transform: [
          `translate(-50%, -25%) scale(0.5) ${
            imageIndex % 2
              ? `rotate(${rotation}deg)`
              : `rotate(-${rotation}deg)`
          }`,
          `translate(-50%, -50%) scale(1) ${
            imageIndex % 2
              ? `rotate(-${rotation}deg)`
              : `rotate(${rotation}deg)`
          }`,
        ],
      },
      { type: "spring", damping: 15, stiffness: 200 }
    );

    animate(
      selector,
      {
        opacity: [1, 0],
      },
      { ease: "linear", duration: 0.5, delay: 1 }
    );

    imageRenderCount.current = imageRenderCount.current + 1;
  };

  return (
    <div
      ref={scope}
      className="relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {children}

      {images.map((img, index) => (
        <img
          className="pointer-events-none absolute left-0 top-0 h-36 w-auto object-cover opacity-0"
          src={img}
          alt={`Mouse move image ${index}`}
          key={index}
          data-mouse-move-index={index}
        />
      ))}
    </div>
  );
};

export default SignUp;
