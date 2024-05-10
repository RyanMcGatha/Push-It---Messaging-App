import {
  FiEdit,
  FiChevronDown,
  FiTrash,
  FiShare,
  FiPlusSquare,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import { MotionConfig } from "framer-motion";
import OnesCard from "./OnesCard";

const ChatSettings = ({ id, chats, onDelete }) => {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    const filterParams = encodeURIComponent(
      JSON.stringify({
        chat_id: Number(id),
      })
    );

    try {
      const response = await fetch(
        `https://us-east-2.aws.neurelo.com/rest/chats?filter=${filterParams}`,
        {
          method: "DELETE",
          headers: {
            "X-API-KEY":
              "neurelo_9wKFBp874Z5xFw6ZCfvhXVDJ+LiTxRH5g8EIPHIltF4eJyUkIkPuZa28E/j27n4p7g78sodDoNFVybTx3GuBXAQY2QFUoXUQQff3EYC8Yp9b0HY1CmFBYQQQYKrKXWHzocwrP/W6PeIG+R8mwaPKJ/Q0YH42gsX2Pm2oNj1LpgHkX6CinOF6GPzXyftO88Hm_6WDq3T3BsqUg5xLhWKkSs5N9zZ4PXT+Y+THHalGqfb8=",
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete chat");
      } else {
        console.log("Chat deleted successfully!");
        setOpen(false);
        onDelete(id);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <motion.div animate={open ? "open" : "closed"} className="relative z-10 ">
      <button
        onClick={() => setOpen((pv) => !pv)}
        className=" text-eucalyptus-200 text-lg md:text-xl underline hover:text-eucalyptus-400 flex items-center"
      >
        <span className=" text-eucalyptus-200 text-lg md:text-xl underline hover:text-eucalyptus-400 flex items-center">
          <AnimatedHamburgerButton />
        </span>
      </button>

      <motion.ul
        initial={wrapperVariants.closed}
        variants={wrapperVariants}
        style={{ originY: "top", translateX: "-50%" }}
        className="flex flex-col gap-2 p-2 rounded-lg bg-eucalyptus-400 shadow-xl absolute top-[320%] left-[25%] w-32 overflow-hidden"
      >
        {/* <Option setOpen={setOpen} Icon={FiEdit} text="Edit" />
        <Option setOpen={setOpen} Icon={FiPlusSquare} text="Duplicate" />
        <Option setOpen={setOpen} Icon={FiShare} text="Share" /> */}
        <button onClick={handleDelete}>
          <Option setOpen={setOpen} Icon={FiTrash} text="Remove" />
        </button>
      </motion.ul>
    </motion.div>
  );
};

const Option = ({ text, Icon, setOpen }) => {
  return (
    <motion.li
      variants={itemVariants}
      onClick={() => setOpen(false)}
      className="flex items-center gap-2 w-full p-2 text-sm font-medium whitespace-nowrap rounded-md hover:bg-eucalyptus-500 text-eucalyptus-900 hover:text-eucalyptus-950 transition-colors cursor-pointer"
    >
      <motion.span variants={actionIconVariants}>
        <Icon />
      </motion.span>
      <span>{text}</span>
    </motion.li>
  );
};

export default ChatSettings;

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
    },
  },
};

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
};

const AnimatedHamburgerButton = () => {
  const [active, setActive] = useState(false);
  return (
    <MotionConfig
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
    >
      <motion.button
        initial={false}
        animate={active ? "open" : "closed"}
        onClick={() => setActive((pv) => !pv)}
        className="bg-eucalyptus-800 text-eucalyptus-200 font-medium px-4 py-4 hover:bg-eucalyptus-950 transition-colors text-2xl relative h-16 w-16 rounded-xl z-0"
      >
        <motion.span
          variants={VARIANTS.top}
          className="absolute h-1 w-10 bg-white"
          style={{ y: "-50%", left: "50%", x: "-50%", top: "35%" }}
        />
        <motion.span
          variants={VARIANTS.middle}
          className="absolute h-1 w-10 bg-white"
          style={{ left: "50%", x: "-50%", top: "50%", y: "-50%" }}
        />
        <motion.span
          variants={VARIANTS.bottom}
          className="absolute h-1 w-5 bg-white"
          style={{
            x: "-50%",
            y: "50%",
            bottom: "35%",
            left: "calc(50% + 10px)",
          }}
        />
      </motion.button>
    </MotionConfig>
  );
};

const VARIANTS = {
  top: {
    open: {
      rotate: ["0deg", "0deg", "45deg"],
      top: ["35%", "50%", "50%"],
    },
    closed: {
      rotate: ["45deg", "0deg", "0deg"],
      top: ["50%", "50%", "35%"],
    },
  },
  middle: {
    open: {
      rotate: ["0deg", "0deg", "-45deg"],
    },
    closed: {
      rotate: ["-45deg", "0deg", "0deg"],
    },
  },
  bottom: {
    open: {
      rotate: ["0deg", "0deg", "45deg"],
      bottom: ["35%", "50%", "50%"],
      left: "50%",
    },
    closed: {
      rotate: ["45deg", "0deg", "0deg"],
      bottom: ["50%", "50%", "35%"],
      left: "calc(50% + 10px)",
    },
  },
};
