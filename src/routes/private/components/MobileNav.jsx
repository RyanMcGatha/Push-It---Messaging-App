import { useState } from "react";
import { FiMenu, FiX, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { supabase } from "../../../../supabaseConfig";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="grid place-content-center relative">
      <div className="flex items-center text-white">
        <motion.button
          whileHover={{ rotate: "180deg" }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="bg-eucalyptus-800 text-eucalyptus-200 font-medium px-4 py-4 rounded-xl hover:bg-eucalyptus-950 transition-opacity text-2xl"
        >
          <FiMenu />
        </motion.button>
      </div>
      <Nav isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

const Nav = ({ isOpen, setIsOpen }) => {
  return (
    <motion.nav
      className="fixed z-50 left-0 top-0 bottom-0 w-screen bg-eucalyptus-950"
      animate={isOpen ? "open" : "closed"}
      variants={navVariants}
      initial="closed"
    >
      <motion.button
        className="text-3xl bg-white text-black hover:text-eucalyptus-400 border-[1px] border-transparent hover:border-eucalyptus-400 transition-colors p-4 rounded-full absolute top-8 right-8"
        whileHover={{ rotate: "180deg" }}
        onClick={() => setIsOpen(false)}
        whileTap={{ scale: 0.9 }}
      >
        <FiX />
      </motion.button>
      <motion.div
        variants={linkWrapperVariants}
        className="flex flex-col gap-4 absolute bottom-8 left-3 w-full"
      >
        <NavLink text="Home" href="/home" />

        {/* <NavLink text="Ones" href="/ones" />
        <NavLink text="Groups" href="/groups" /> */}
        <NavLink
          text="Sign Out"
          onClick={() => {
            supabase.auth.signOut();
          }}
        />
      </motion.div>
    </motion.nav>
  );
};

const NavLink = ({ text, href, onClick }) => {
  return (
    <motion.a
      className="inline-block z-10 text-eucalyptus-200 w-fit font-black text-6xl hover:text-eucalyptus-400 transition-colors"
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
