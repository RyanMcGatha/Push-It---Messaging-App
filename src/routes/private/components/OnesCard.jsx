import { FiMessageCircle } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ChatSettings from "./ChatSettings";
import { useState } from "react";

const OnesCard = ({
  id,
  title,
  usernames,
  chats,
  onDelete,
  setSelectedChat,
}) => {
  return (
    <ShimmerBorderCard
      key={id}
      title={title}
      id={id}
      usernames={usernames}
      chats={chats}
      onDelete={onDelete}
      setSelectedChat={setSelectedChat}
    />
  );
};

const ShimmerBorderCard = ({
  id,
  title,
  usernames,
  chats,
  onDelete,
  setSelectedChat,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="group relative rounded-xl shadow-xl overflow-hidden bg-eucalyptus-400 transition-all duration-500 flex w-full border-eucalyptus-400 border-2">
      <div
        className="bg-eucalyptus-900 transition-colors duration-500 group-hover:bg-eucalyptus-900/50 w-full flex justify-between text-center z-10"
        onClick={() => {
          setSelectedChat(id);
        }}
      >
        <div className="flex flex-col items-center">
          <FiMessageCircle className=" rounded-full border-2 border-eucalyptus-400 bg-eucalyptus-950 p-2 text-6xl text-eucalyptus-200" />
        </div>
        <div className="flex flex-col items-center justify-between">
          <p className=" text-lg md:text-xl font-bold text-eucalyptus-200 capitalize mb-2">
            <span className="text-eucalyptus-400 text-4xl">{title}</span>
          </p>
          <p className=" text-lg md:text-xl font-bold text-eucalyptus-200 capitalize mb-2 flex w-full">
            <div className="flex justify-center gap-1 w-full ">
              {usernames.map((name, index) => (
                <span key={index} className="text-eucalyptus-400 text-lg">
                  {name}
                  {index < usernames.length - 1 ? ", " : ""}
                </span>
              ))}
            </div>
          </p>

          <p className="z-10 text-eucalyptus-200 text-lg md:text-xl underline hover:text-eucalyptus-400">
            <Link to={`/ones/${id}/${usernames}`}>View Conversation</Link>
          </p>
        </div>
        <div className="flex flex-col items-center">
          <ChatSettings
            id={id}
            onDelete={onDelete}
            open={open}
            setOpen={setOpen}
          />
        </div>
      </div>
      <motion.div
        initial={{ rotate: "0deg" }}
        animate={{ rotate: "360deg" }}
        style={{ scale: 4.5 }}
        transition={{
          repeat: Infinity,
          duration: 15.5,
          ease: "linear",
        }}
        className="absolute inset-0 z-0 bg-gradient-to-br from-eucalyptus-950 via-eucalyptus-900/0 to-eucalyptus-950 opacity-0 transition-opacity duration-500 group-hover:opacity-50 overflow-hidden w-full h-full"
      />
    </div>
  );
};

export default OnesCard;
