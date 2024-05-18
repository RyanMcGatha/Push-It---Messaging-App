import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { HiHome } from "react-icons/hi";
import { FaSignOutAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useTheme } from "../../../ThemeContext";
import { getUserData, useUser } from "./Hooks";
import { supabase } from "../../../../supabaseConfig";

export const SideNav = () => {
  const [selected, setSelected] = useState(() => {
    const savedSelected = localStorage.getItem("selectedNav");
    return savedSelected !== null ? parseInt(savedSelected, 10) : 0;
  });
  const [profilePic, setProfilePic] = useState(null);
  const { theme } = useTheme();
  const { username } = getUserData();
  const { userData } = useUser();

  useEffect(() => {
    if (userData.length > 0) {
      const user = userData.find((user) => user.username === username);
      if (user) {
        setProfilePic(user.profile_pic);
      }
    }
  }, [userData, username]);

  const handleNavClick = (id, url) => {
    setSelected(id);
    localStorage.setItem("selectedNav", id);
    window.location.href = url;
  };

  return (
    <nav
      className={`h-full w-fit p-4 flex flex-col items-center gap-2 ${
        theme === "light" ? "bg-gray-100" : "bg-dark"
      }`}
    >
      <img
        src={profilePic || "default-profile-pic-url"}
        alt={`${username}'s profile`}
        className={`w-10 h-10 rounded-full border-2 ${
          theme === "light" ? "border-gray-300" : "border-dark-lighter"
        }`}
      />

      <NavItem
        selected={selected === 0}
        id={0}
        onClick={() => handleNavClick(0, "/home")}
      >
        <HiHome />
      </NavItem>
      <NavItem
        selected={selected === 1}
        id={1}
        onClick={() => handleNavClick(1, `/${username}`)}
      >
        <CgProfile />
      </NavItem>
      <NavItem
        selected={selected === 2}
        id={2}
        onClick={() => {
          supabase.auth.signOut();
          localStorage.removeItem("selectedNav");
        }}
      >
        <FaSignOutAlt />
      </NavItem>
    </nav>
  );
};

const NavItem = ({ children, selected, id, onClick }) => {
  const { theme } = useTheme();

  return (
    <motion.button
      className={`p-3 text-xl rounded-md transition-colors relative ${
        theme === "light"
          ? "bg-gray-200 hover:bg-gray-300 text-black"
          : "bg-gray-700 hover:bg-gray-600 text-white"
      }`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="block relative z-10">{children}</span>
      <AnimatePresence>
        {selected && (
          <motion.span
            className="absolute inset-0 rounded-md bg-indigo-600 z-0"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          ></motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};
