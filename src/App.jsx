import React from "react";
import { useAuth } from "./contexts/AuthContext";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PrivateLayout from "./layouts/PrivateLayout";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import { Profile } from "./pages/Profile";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import RequestPasswordReset from "./pages/RequestPasswordReset";
import ResetPasswordForm from "./pages/ResetPasswordForm";
import { Maintenance } from "./pages/Maintenance";

const App = () => {
  const { session } = useAuth();

  const routes = [
    {
      path: "/",
      element: <Maintenance />,
    },
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default App;
