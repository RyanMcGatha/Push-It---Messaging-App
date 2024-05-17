import { Outlet, useOutletContext } from "react-router-dom";

import { SideNav } from "./components/SideNav";

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
