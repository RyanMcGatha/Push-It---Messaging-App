import React from "react";
import { useAuth } from "../AuthContext";
import SignIn from "./public/SignIn";
import PrivateLayout from "./private/PrivateLayout";
import Home from "./private/Home";
import ErrorPage from "./public/ErrorPage";
import Profile from "./private/Profile";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import OneOnOne from "./private/OneOnOne";
import Groups from "./private/Groups";
import SignUp from "./public/SignUp";

const Routes = () => {
  const { session } = useAuth();
  if (session === "loading") {
    return <div>Loading...</div>;
  }

  const routes = [
    {
      path: "/",
      element: session ? <Navigate to="/home" /> : <SignIn />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/signup",
      element: session ? <Navigate to="/home" /> : <SignUp />,
    },

    {
      element: session ? <PrivateLayout /> : <Navigate to="/" />,
      children: [
        { path: "/home", element: <Home /> },
        { path: "/:username", element: <Profile /> },
        { path: "/ones/:id/:usernames", element: <OneOnOne /> },
      ],
    },
  ];
  const router = createBrowserRouter([...routes]);
  return <RouterProvider router={router} />;
};

export default Routes;
