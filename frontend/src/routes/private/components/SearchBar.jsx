import {
  animate,
  useMotionTemplate,
  useMotionValue,
  motion,
} from "framer-motion";
import React, { useEffect, useRef } from "react";
import { FiArrowRight } from "react-icons/fi";

const SearchBar = () => {
  return (
    <div className=" pl-96">
      <style>{`.mask-with-browser-support {
      mask: linear-gradient(black, black), linear-gradient(black, black);
      mask-clip: content-box, border-box;
      mask-composite: exclude;
      -webkit-mask:
        linear-gradient(black, black) content-box,
        linear-gradient(black, black);
      -webkit-mask-clip: content-box, border-box;
      -webkit-mask-composite: xor`}</style>
      <BeamInput />
    </div>
  );
};

const BeamInput = () => {
  const inputRef = useRef(null);

  const turn = useMotionValue(0);

  useEffect(() => {
    animate(turn, 1, {
      ease: "linear",
      duration: 5,
      repeat: Infinity,
    });
  }, []);

  const backgroundImage = useMotionTemplate`conic-gradient(from ${turn}turn, #009463 75%, #2fd896 100%)`;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      onClick={() => {
        inputRef.current.focus();
      }}
      className="relative flex w-full items-center gap-2 rounded-full border border-white/20 bg-gradient-to-br from-white/20 to-white/5 py-1.5 pl-6 pr-1.5"
    >
      <input
        ref={inputRef}
        type="email"
        placeholder="Search Conversations"
        className=" min-w-96 bg-transparent text-xl text-eucalyptus-200 placeholder-eucalyptus-200 focus:outline-0"
      />

      <button
        onClick={(e) => e.stopPropagation()}
        type="submit"
        className="group flex shrink-0 items-center gap-1.5 rounded-full bg-eucalyptus-900 px-4 py-3 text-eucalyptus-200 text-lg transition-transform active:scale-[0.985] hover:bg-eucalyptus-950"
      >
        <span>Search</span>
        <FiArrowRight className="-mr-4 opacity-0 transition-all group-hover:-mr-0 group-hover:opacity-100 group-active:-rotate-45" />
      </button>

      <div className="pointer-events-none absolute inset-0 z-10 rounded-full">
        <motion.div
          style={{
            backgroundImage,
          }}
          className="mask-with-browser-support absolute -inset-[1px] rounded-full border border-transparent bg-origin-border"
        />
      </div>
    </form>
  );
};

export default SearchBar;
