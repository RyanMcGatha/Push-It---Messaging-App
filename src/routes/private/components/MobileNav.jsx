import { useState } from "react";
import { FiMenu, FiX, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { useTheme } from "../../../ThemeContext";
import { supabase } from "../../../../supabaseConfig";
import { getUserData } from "./Hooks";
import { useAuth } from "../../../AuthContext";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();

  return (
    <div>
      <div>
        <motion.button
          whileHover={{ rotate: "180deg" }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="text-3xl bg-gray-100 text-black hover:text-indigo-500 transition-colors p-2 rounded-full"
        >
          <FiMenu />
        </motion.button>
      </div>
      <Nav isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

const Nav = ({ isOpen, setIsOpen }) => {
  const { theme, toggleTheme } = useTheme();
  const { username } = getUserData();

  return (
    <motion.nav
      className={`fixed top-0 bottom-0 left-0 w-screen ${
        theme === "light" ? "bg-white" : "bg-dark text-gray-300"
      }`}
      animate={isOpen ? "open" : "closed"}
      variants={navVariants}
      initial="closed"
    >
      <motion.button
        className="text-3xl bg-white text-black hover:text-indigo-500 border-[1px] border-transparent hover:border-indigo-500 transition-colors p-4 rounded-full absolute top-8 right-8"
        whileHover={{ rotate: "180deg" }}
        onClick={() => setIsOpen(false)}
        whileTap={{ scale: 0.9 }}
      >
        <FiX />
      </motion.button>
      <motion.div
        variants={linkWrapperVariants}
        className="flex flex-col gap-4 absolute bottom-8 left-8"
      >
        <NavLink text="Home" href="/home" />

        <NavLink text="Profile" href={`/${username}`} />
        <NavLink
          text="Sign Out"
          onClick={() => {
            localStorage.removeItem("selectedNav");
            localStorage.removeItem("session");
            window.location.reload();
          }}
        />
      </motion.div>
    </motion.nav>
  );
};

const NavLink = ({ text, href, onClick }) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <motion.a
      className={`inline-block z-10 w-fit font-black text-7xl hover:text-indigo-600 transition-colors${
        theme === "light" ? " text-gray-700" : " text-gray-300"
      }`}
      variants={navLinkVariants}
      transition={{
        type: "spring",
        damping: 3,
      }}
      whileHover={{
        y: -15,
        rotate: "-7.5deg",
      }}
      rel="nofollow"
      href={href}
      onClick={onClick}
    >
      {text}
    </motion.a>
  );
};

export default MobileNav;

const navVariants = {
  open: {
    x: "0%",
    borderTopLeftRadius: "0vw",
    borderBottomLeftRadius: "0vw",
    opacity: 1,
  },
  closed: {
    x: "100%",
    borderTopLeftRadius: "50vw",
    borderBottomLeftRadius: "50vw",
    opacity: 0,
  },
};

const linkWrapperVariants = {
  open: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const navLinkVariants = {
  open: { x: 0 },
  closed: { x: 25 },
};
