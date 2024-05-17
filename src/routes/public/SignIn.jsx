import { useAnimate } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "../../../supabaseConfig";
import { redirect, Link } from "react-router-dom";

const SignIn = () => {
  return (
    <MouseImageTrail
      renderImageBuffer={50}
      rotationRange={25}
      images={new Array(16).fill("pushitt.png")}
    >
      <section className="h-screen bg-eucalyptus-950">
        <Copy />
        <WatermarkWrapper />
      </section>
    </MouseImageTrail>
  );
};

const Copy = () => (
  <section className="z-[999999] fixed flex flex-col w-screen h-screen items-center md:justify-center gap-10">
    <Logo />
    <Form />
  </section>
);

const Form = () => {
  const [email, setEmail] = useState("");
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

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        alert(error.message);
      } else if (data.user) {
        redirect("/home");
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFocus = (event) => {
    event.target.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="px-5 md:scale-110 lg:scale-125 xl:scale-150">
      <motion.div
        initial="initial"
        whileInView="animate"
        transition={{ staggerChildren: 0.05 }}
        viewport={{ once: true }}
        className="rounded-xl bg-eucalyptus-950 border-eucalyptus-400 border-2 font-semibold"
        style={{ backgroundAttachment: "fixed", backdropFilter: "blur(15px)" }}
      >
        <div className="mx-auto my-auto p-10 text-eucalyptus-200">
          <motion.h1
            variants={primaryVariants}
            className="p-2 text-center text-6xl font-semibold"
          >
            Sign In
          </motion.h1>
          <motion.p
            variants={primaryVariants}
            className="p-2 text-center text-3xl font-semibold"
          >
            Sign in and just Push It!
          </motion.p>
          <form onSubmit={handleLogin} className="w-full text-xl">
            <motion.div variants={primaryVariants} className="mb-2 w-full">
              <label
                htmlFor="email-input"
                className="mb-1 inline-block font-extrabold"
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
                onChange={(e) => setEmail(e.target.value)}
                onFocus={handleFocus}
              />
            </motion.div>
            <motion.div variants={primaryVariants} className="mb-2 w-full">
              <label
                htmlFor="password-input"
                className="mb-1 inline-block font-extrabold"
              >
                Password<span className="pl-1 text-red-500">*</span>
              </label>
              <input
                id="password-input"
                type="password"
                placeholder="Enter your password"
                className="w-full rounded border-[1px] px-2.5 py-1.5 focus:outline-eucalyptus-700 bg-eucalyptus-950 border-eucalyptus-400 font-semibold placeholder-eucalyptus-200"
                required
                value={password}
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                onFocus={handleFocus}
              />
            </motion.div>
            <div className="text-lg text-center flex justify-center gap-1 my-1 w-full">
              Don't have an account?
              <Link
                to="/signup"
                className="underline hover:text-eucalyptus-800"
              >
                Sign Up!
              </Link>
            </div>
            <motion.button
              variants={primaryVariants}
              whileTap={{ scale: 0.985 }}
              type="submit"
              className="w-full rounded bg-eucalyptus-800 px-4 py-2 text-center font-semibold text-lg text-eucalyptus-100 transition-colors hover:bg-eucalyptus-900 mt-1"
            >
              {loading ? "Signing In..." : "Sign In"}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

const Logo = () => (
  <img
    src="pushitSlogan.png"
    alt="Push It Logo"
    className="w-56 h-auto md:fixed md:left-5 md:top-5 relative"
  />
);

const primaryVariants = {
  initial: { y: 55, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

const WatermarkWrapper = () => (
  <>
    {[...Array(8)].map((_, i) => (
      <Watermark key={i} text="Push It! Push It!" reverse={i % 2 === 1} />
    ))}
  </>
);

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

const TranslateWrapper = ({ children, reverse }) => (
  <motion.div
    initial={{ translateX: reverse ? "-100%" : "0%" }}
    animate={{ translateX: reverse ? "0%" : "-100%" }}
    transition={{ duration: 75, repeat: Infinity, ease: "linear" }}
    className="flex"
  >
    {children}
  </motion.div>
);

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

  const calculateDistance = (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1);

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
          `translate(-50%, -25%) scale(0.5) rotate(${rotation}deg)`,
          `translate(-50%, -50%) scale(1) rotate(-${rotation}deg)`,
        ],
      },
      { type: "spring", damping: 15, stiffness: 200 }
    );

    animate(
      selector,
      { opacity: [1, 0] },
      { ease: "linear", duration: 0.5, delay: 1 }
    );

    imageRenderCount.current += 1;
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

export default SignIn;
