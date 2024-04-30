import { FiMessageCircle } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const OnesCard = ({ id, title, usernames }) => {
  return (
    <ShimmerBorderCard key={id} title={title} id={id} usernames={usernames} />
  );
};

const ShimmerBorderCard = ({ id, title, usernames }) => {
  return (
    <div className="group relative overflow-hidden rounded-md bg-eucalyptus-400 transition-all duration-500 flex items-center justify-center flex-col w-72 md:w-96 h-fit border-eucalyptus-400 border-4">
      <div className="bg-eucalyptus-900 transition-colors duration-500 group-hover:bg-eucalyptus-900/50 flex flex-col items-center p-4 w-full h-full">
        <FiMessageCircle className="z-10 rounded-full border-2 border-eucalyptus-400 bg-eucalyptus-950 p-4 text-7xl text-eucalyptus-200 my-2" />
        <p className="z-10 text-lg md:text-xl font-bold text-eucalyptus-200 capitalize mb-2">
          {title}
        </p>
        <p className="z-10 text-eucalyptus-200 text-lg md:text-xl underline hover:text-eucalyptus-400">
          <Link to={`/ones/${id}/${usernames}`}>View Conversation</Link>
        </p>
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
        className="absolute inset-0 z-0 bg-gradient-to-br from-eucalyptus-950 via-eucalyptus-900/0 to-eucalyptus-950 opacity-0 transition-opacity duration-500 group-hover:opacity-50"
      />
    </div>
  );
};

export default OnesCard;
