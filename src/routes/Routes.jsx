import React from "react";
import { useAuth } from "../AuthContext";
import SignIn from "./public/SignIn";
import PrivateLayout from "./private/PrivateLayout";
import Home from "./private/Home";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

const Routes = () => {
  const { session } = useAuth();
  if (session === "loading") {
    return <div>Loading...</div>;
  }

  const routes = [
    {
      path: "/",
      element: session ? <Navigate to="home" /> : <SignIn />,
    },
    {
      element: session ? <PrivateLayout /> : <Navigate to="/" />,
      children: [{ path: "home", element: <Home /> }],
    },
  ];
  const router = createBrowserRouter([...routes]);
  return <RouterProvider router={router} />;
};

export default Routes;
