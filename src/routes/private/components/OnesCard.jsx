import { FiMessageCircle } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const OnesCard = ({ id, title }) => {
  console.log("OnesCard", id);
  return <ShimmerBorderCard key={id} title={title} id={id} />;
};

const ShimmerBorderCard = ({ id, title }) => {
  return (
    <div className="group relative  w-full min-h-72 max-h-fit max-w-xs overflow-hidden rounded-lg bg-eucalyptus-400 p-0.5 transition-all duration-500 hover:scale-[1.01] hover:bg-eucalyptus-400/50">
      <div className="relative z-10 flex flex-col items-center justify-center overflow-hidden rounded-[7px] bg-eucalyptus-900 p-8 transition-colors duration-500 group-hover:bg-eucalyptus-900/50">
        <FiMessageCircle className="relative z-10 mb-10 mt-2 rounded-full border-2 border-eucalyptus-400 bg-eucalyptus-950 p-4 text-7xl text-eucalyptus-200" />

        <h4 className="relative z-10 mb-4 w-full text-3xl font-bold text-eucalyptus-200">
          {title}
        </h4>
        <p className="relative z-10 text-eucalyptus-300">
          <Link to={`/ones/${id}`}>View</Link>
        </p>
      </div>

      <motion.div
        initial={{ rotate: "0deg" }}
        animate={{ rotate: "360deg" }}
        style={{ scale: 1.5 }}
        transition={{
          repeat: Infinity,
          duration: 10.5,
          ease: "linear",
        }}
        className="absolute inset-0 z-0 bg-gradient-to-br from-eucalyptus-950 via-eucalyptus-900/0 to-eucalyptus-950 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
    </div>
  );
};

export default OnesCard;
