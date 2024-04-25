import React from "react";
import { useAuth } from "../AuthContext";
import Home from "./private/Home";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import SignIn from "./public/SignIn";

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
