import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";

const PrivateLayout = () => {
  return (
    <>
      <div className="w-screen h-screen flex">
        <nav className="">
          <Nav />
        </nav>
        <div className="">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default PrivateLayout;
