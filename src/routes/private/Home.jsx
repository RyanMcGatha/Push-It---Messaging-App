import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import Card from "./components/Card";

import {
  useMotionValueEvent,
  AnimatePresence,
  useScroll,
  motion,
} from "framer-motion";
import { NavLink } from "react-router-dom";

const Home = ({ color = "white" }) => {
  return (
    <>
      <div
        className=" bg-eucalyptus-950 relative min-h-screen flex flex-col p-10 gap-10"
        style={{ maxWidth: "85vw", width: "85vw" }}
      >
        <div>
          <h1 className="text-6xl text-eucalyptus-200">Pinned Convos</h1>
          <div className="h-full flex items-center p-7 gap-5">
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
        <div>
          <h1 className="text-6xl text-eucalyptus-200">Recent one on one's</h1>
          <div className="h-full flex items-center p-7 gap-5">
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
        <div>
          <h1 className="text-6xl text-eucalyptus-200">Recent Groups</h1>
          <div className="h-full flex items-center p-7 gap-5">
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
