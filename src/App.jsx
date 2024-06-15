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

const App = () => {
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
      path: "/request-password-reset",
      element: <RequestPasswordReset />,
    },
    {
      path: "/reset-password/:token",
      element: <ResetPasswordForm />,
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

export default App;
