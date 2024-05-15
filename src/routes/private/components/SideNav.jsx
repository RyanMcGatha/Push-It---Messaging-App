import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { HiHome, HiSearch, HiStar, HiTrash } from "react-icons/hi";
import { ImProfile } from "react-icons/im";
import { IoSettings } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { getUserData } from "./Hooks";
import { CgProfile } from "react-icons/cg";

const SideNav = () => {
  const [selected, setSelected] = useState(0);
  const { username } = getUserData();

  return (
    <nav
      className="h-full w-fit p-4 flex flex-col items-center gap-2 border-r-black border-r-"
      style={{ background: "rgb(22 24 28)" }}
    >
      <NavLink to={`/${username}`}>
        <CgProfile className="text-5xl" />
      </NavLink>
      <NavItem selected={selected === 0} id={0} setSelected={setSelected}>
        <HiHome
          onClick={() => {
            window.location.href = "/home";
          }}
        />
      </NavItem>
      <NavItem selected={selected === 1} id={1} setSelected={setSelected}>
        <HiSearch />
      </NavItem>
      <NavItem selected={selected === 2} id={2} setSelected={setSelected}>
        <HiStar />
      </NavItem>
      <NavItem selected={selected === 3} id={3} setSelected={setSelected}>
        <HiTrash />
      </NavItem>
      <NavItem selected={selected === 4} id={4} setSelected={setSelected}>
        <IoSettings />
      </NavItem>
    </nav>
  );
};

const NavItem = ({ children, selected, id, setSelected }) => {
  return (
    <motion.button
      className="p-3 text-xl bg-slate-800 hover:bg-slate-700 rounded-md transition-colors relative"
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
