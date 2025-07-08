import { createBrowserRouter, Outlet } from "react-router-dom";
import Login from "./page/Login";
import Register from "./page/Register";
import Dashboard from "./page/Dashboard";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);
