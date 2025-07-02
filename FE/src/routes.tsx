import { createBrowserRouter } from "react-router-dom";
import Login from "./page/Login";
import Register from "./page/Register";
import DashboardSadmin from "./Superadmin/DashboardSadmin";
import DashboardAdmin from "./Admin/DashboardAdmin";
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
    path: "/dashboardSadmin",
    element: <DashboardSadmin />,
  },
  {
    path: "/dashboardAdmin",
    element: <DashboardAdmin />,
  },
]);
