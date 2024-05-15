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
        <Outlet />
      </div>
    </>
  );
};

export default PrivateLayout;
