import React from "react";
import { useAuth } from "../AuthContext";
import SignIn from "./public/SignIn";
import PrivateLayout from "../routes/private/PrivateLayout";
import Home from "../routes/private/Home";
import ErrorPage from "../routes/public/ErrorPage";
import { Profile } from "../routes/private/Profile";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import SignUp from "./public/SignUp";

const Routes = () => {
  const { session } = useAuth();

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
      ],
    },
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default Routes;
