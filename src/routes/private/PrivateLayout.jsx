import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import SearchBar from "./components/SearchBar";
import MobileNav from "./components/MobileNav";
import SideNav from "./components/SideNav";

const PrivateLayout = () => {
  return (
    <>
      <div className="w-screen h-screen flex ">
        <SideNav />

        <div className="flex flex-col w-full h-full">
          <nav
            className=" text-white bg-eucalyptus-900 flex items-center w-full shadow-xl py-3 md:pl-5 border-b-eucalyptus-400 border-b-[1px] justify-around md:justify-start"
            style={{ height: "10%" }}
          >
            <a className="md:pr-5">
              <MobileNav />
            </a>
            <div className="flex justify-center items-center gap-2">
              <span className="text-4xl font-semibold text-eucalyptus-200">
                Push It!
              </span>
              <img
                src="pushitt.png"
                alt="Push It! Logo"
                className=" w-20 h-auto p-1"
              />
            </div>
          </nav>
          <div className="w-full" style={{ height: "90%" }}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivateLayout;
