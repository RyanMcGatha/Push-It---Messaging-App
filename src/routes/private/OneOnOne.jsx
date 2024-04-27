import React from "react";
import SearchBar from "./components/SearchBar";

const OneOnOne = () => {
  return (
    <>
      <div
        className=" bg-eucalyptus-950 relative min-h-screen flex flex-col p-10 gap-10 text-eucalyptus-200"
        style={{ maxWidth: "85vw", width: "85vw" }}
      >
        <div className="flex w-full h-96 bg-black ">Display box</div>
        <form>
          <input
            type="text"
            placeholder="Enter Message"
            className="p-2 placeholder-black text-black"
          />
        </form>
      </div>
    </>
  );
};

export default OneOnOne;
