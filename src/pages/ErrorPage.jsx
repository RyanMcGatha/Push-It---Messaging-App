import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ErrorPage = () => {
  return <CodeBeams />;
};

export default ErrorPage;

export const CodeBeams = () => {
  return (
    <div className="relative overflow-hidden bg-eucalyptus-900 w-screen h-screen items-center justify-center flex">
      <div className="z-20">
        <section className="z-20 ">
          <div className="main_wrapper">
            <div className="main">
              <div className="antenna">
                <div className="antenna_shadow"></div>
                <div className="a1"></div>
                <div className="a1d"></div>
                <div className="a2"></div>
                <div className="a2d"></div>
                <div className="a_base"></div>
              </div>
              <div className="tv">
                <div className="cruve">
                  <svg
                    xmlSpace="preserve"
                    viewBox="0 0 189.929 189.929"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    className="curve_svg"
                  >
                    <path
                      d="M70.343,70.343c-30.554,30.553-44.806,72.7-39.102,115.635l-29.738,3.951C-5.442,137.659,11.917,86.34,49.129,49.13
        C86.34,11.918,137.664-5.445,189.928,1.502l-3.95,29.738C143.041,25.54,100.895,39.789,70.343,70.343z"
                    ></path>
                  </svg>
                </div>
                <div className="display_div">
                  <div className="screen_out">
                    <div className="screen_out1">
                      <div className="screen">
                        <span className="notfound_text"> NOT FOUND</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lines">
                  <div className="line1"></div>
                  <div className="line2"></div>
                  <div className="line3"></div>
                </div>
                <div className="buttons_div">
                  <div className="b1">
                    <div></div>
                  </div>
                  <div className="b2"></div>
                  <div className="speakers">
                    <div className="g1">
                      <div className="g11"></div>
                      <div className="g12"></div>
                      <div className="g13"></div>
                    </div>
                    <div className="g"></div>
                    <div className="g"></div>
                  </div>
                </div>
              </div>
              <div className="bottom">
                <div className="base1"></div>
                <div className="base2"></div>
                <div className="base3"></div>
              </div>
            </div>
            <div className="text_404">
              <div className="text_4041 bg-gradient-to-br from-white to-gray-400 bg-clip-text font-extrabold text-transparent">
                4
              </div>
              <div className="text_4041 bg-gradient-to-br from-white to-gray-400 bg-clip-text font-extrabold text-transparent">
                0
              </div>
              <div className="text_4041 bg-gradient-to-br from-white to-gray-400 bg-clip-text font-extrabold text-transparent">
                4
              </div>
            </div>
          </div>
        </section>
      </div>
      <BGGrid />
    </div>
  );
};

const BGGrid = () => {
  return (
    <div
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='rgb(180 254 215/ 0.2)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
      }}
      className="absolute bottom-0 left-0 right-0 top-0"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-eucalyptus-950/70 via-eucalyptus-950/0 to-eucalyptus-950/70" />
      <Beams />
    </div>
  );
};

const Beams = () => {
  const { width } = useWindowSize();

  const numColumns = width ? Math.floor(width / GRID_BOX_SIZE) : 0;

  const placements = [
    {
      top: GRID_BOX_SIZE * 0,
      left: Math.floor(numColumns * 0.05) * GRID_BOX_SIZE,
      transition: {
        duration: 3.5,
        repeatDelay: 5,
        delay: 2,
      },
    },
    {
      top: GRID_BOX_SIZE * 12,
      left: Math.floor(numColumns * 0.15) * GRID_BOX_SIZE,
      transition: {
        duration: 3.5,
        repeatDelay: 10,
        delay: 4,
      },
    },
    {
      top: GRID_BOX_SIZE * 3,
      left: Math.floor(numColumns * 0.25) * GRID_BOX_SIZE,
    },
    {
      top: GRID_BOX_SIZE * 9,
      left: Math.floor(numColumns * 0.75) * GRID_BOX_SIZE,
      transition: {
        duration: 2,
        repeatDelay: 7.5,
        delay: 3.5,
      },
    },
    {
      top: 0,
      left: Math.floor(numColumns * 0.7) * GRID_BOX_SIZE,
      transition: {
        duration: 3,
        repeatDelay: 2,
        delay: 1,
      },
    },
    {
      top: GRID_BOX_SIZE * 2,
      left: Math.floor(numColumns * 1) * GRID_BOX_SIZE - GRID_BOX_SIZE,
      transition: {
        duration: 5,
        repeatDelay: 5,
        delay: 5,
      },
    },
  ];

  return (
    <>
      {placements.map((p, i) => (
        <Beam
          key={i}
          top={p.top}
          left={p.left - BEAM_WIDTH_OFFSET}
          transition={p.transition || {}}
        />
      ))}
    </>
  );
};

const Beam = ({ top, left, transition = {} }) => {
  return (
    <motion.div
      initial={{
        y: 0,
        opacity: 0,
      }}
      animate={{
        opacity: [0, 1, 0],
        y: 32 * 8,
      }}
      transition={{
        ease: "easeInOut",
        duration: 3,
        repeat: Infinity,
        repeatDelay: 1.5,
        ...transition,
      }}
      style={{
        top,
        left,
      }}
      className="absolute z-10 h-[64px] w-[1px] bg-gradient-to-b from-eucalyptus-200 to-eucalyptus-200"
    />
  );
};

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
};

const GRID_BOX_SIZE = 32;
const BEAM_WIDTH_OFFSET = 1;
