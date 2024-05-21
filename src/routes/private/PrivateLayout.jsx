import { Outlet, useOutletContext } from "react-router-dom";

import { SideNav } from "./components/SideNav";

const PrivateLayout = () => {
  return (
    <>
      <div className="w-screen h-screen flex ">
        <div className=" hidden md:flex">
          <SideNav />
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default PrivateLayout;
