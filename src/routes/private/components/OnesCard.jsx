import { FiMessageCircle } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ChatSettings from "./ChatSettings";

const OnesCard = ({ id, title, usernames, chats, onDelete }) => {
  return (
    <ShimmerBorderCard
      key={id}
      title={title}
      id={id}
      usernames={usernames}
      chats={chats}
      onDelete={onDelete}
    />
  );
};

const ShimmerBorderCard = ({ id, title, usernames, chats, onDelete }) => {
  return (
    <div className="group relative rounded-xl shadow-xl overflow-hidden bg-eucalyptus-400 transition-all duration-500 flex w-full border-eucalyptus-400 border-2">
      <div className="bg-eucalyptus-900 transition-colors duration-500 group-hover:bg-eucalyptus-900/50 w-full  flex justify-center text-center">
        <image className="w-full">
          <img className="rounded-full border-2 border-eucalyptus-400 bg-eucalyptus-950 p-2 text-6xl text-eucalyptus-200 " />
        </image>
        <div className="flex flex-col items-center w-full justify-between px-2">
          <p className=" text-lg md:text-xl font-bold text-eucalyptus-200 capitalize mb-2">
            <span className="text-eucalyptus-400 text-4xl">{title}</span>
          </p>
          {/* <ChatSettings id={id} chats={chats} onDelete={onDelete} /> */}
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
      </div>

      <motion.div
        initial={{ rotate: "0deg" }}
        animate={{ rotate: "360deg" }}
        style={{ scale: 3.0 }}
        transition={{
          repeat: Infinity,
          duration: 15.5,
          ease: "linear",
        }}
        className="absolute inset-0 z-0 bg-gradient-to-br from-eucalyptus-950 via-eucalyptus-900/0 to-eucalyptus-950 opacity-0 transition-opacity duration-500 group-hover:opacity-50 overflow-hidden"
      />
    </div>
  );
};

export default OnesCard;
