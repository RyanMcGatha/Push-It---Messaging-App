import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { HiHome, HiSearch, HiStar, HiTrash } from "react-icons/hi";
import { IoSettings } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { NavLink } from "react-router-dom";
import { getUserData, useUser } from "./Hooks";
import { useTheme } from "../../../ThemeContext";
import { supabase } from "../../../../supabaseConfig";
import { FaSignOutAlt } from "react-icons/fa";

const SideNav = () => {
  const [selected, setSelected] = useState(0);
  const { username } = getUserData();

  const { userData } = useUser();

  const { theme } = useTheme(); // Use the theme context

  return (
    <nav
      className={`h-full w-fit p-4 flex flex-col items-center gap-2 border-r-4 ${
        theme === "light"
          ? "border-r-black bg-gray-100"
          : "border-r-white bg-dark"
      }`}
    >
      <NavLink to={`/${username}`}>
        <img
          src={userData.find((user) => user.username === username)?.profile_pic}
          alt={`${username}'s profile`}
          className={`w-10 h-10 rounded-full border-2 ${
            theme === "light" ? "border-gray-300" : "border-dark-lighter"
          }`}
        />
      </NavLink>
      <NavItem selected={selected === 0} id={0} setSelected={setSelected}>
        <HiHome
          onClick={() => {
            window.location.href = "/home";
          }}
        />
      </NavItem>
      {/* <NavItem selected={selected === 1} id={1} setSelected={setSelected}>
        <HiSearch />
      </NavItem> */}
      {/* <NavItem selected={selected === 2} id={2} setSelected={setSelected}>
        <HiStar />
      </NavItem>
      <NavItem selected={selected === 3} id={3} setSelected={setSelected}>
        <HiTrash />
      </NavItem> */}
      <NavItem selected={selected === 1} id={1} setSelected={setSelected}>
        <FaSignOutAlt
          onClick={() => {
            supabase.auth.signOut();
          }}
        />
      </NavItem>
    </nav>
  );
};

const NavItem = ({ children, selected, id, setSelected }) => {
  const { theme } = useTheme(); // Use the theme context

  return (
    <motion.button
      className={`p-3 text-xl rounded-md transition-colors relative ${
        theme === "light"
          ? "bg-gray-200 hover:bg-gray-300 text-black"
          : "bg-gray-700 hover:bg-gray-600 text-white"
      }`}
      onClick={() => setSelected(id)}
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

export default SideNav;
