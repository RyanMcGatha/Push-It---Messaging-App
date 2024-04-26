import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import SearchBar from "./components/SearchBar";

const PrivateLayout = () => {
  return (
    <>
      <div className="w-screen h-screen flex border-eucalyptus-400 border-[1px] bg-eucalyptus-950">
        <nav className="">
          <Nav />
        </nav>
        <div className="overflow-y-scroll overflow-x-hidden no-scrollbar">
          <nav
            className=" text-white bg-eucalyptus-900 flex items-center w-full shadow-xl px-10 py-3 justify-between border-b-eucalyptus-400 border-b-[1px]"
            style={{ maxWidth: "85vw", width: "85vw" }}
          >
            <div className="flex items-center gap-2">
              <span className="text-4xl font-semibold text-eucalyptus-200">
                Push It!
              </span>
              <image>
                <img
                  src="pushitt.png"
                  alt="Push It! Logo"
                  className=" w-20 h-auto p-1"
                />
              </image>
            </div>
            <SearchBar />
          </nav>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default PrivateLayout;
