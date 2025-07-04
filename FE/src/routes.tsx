import { createBrowserRouter } from "react-router-dom";
import Login from "./page/Login";
import Register from "./page/Register";
import Dashboard from "./page/Dashboard";
import Kasir from "./page/Kasir";
import Produk from "./page/Produk";
import Histori from "./page/Histori";
import Pelanggan from "./page/Pelanggan";
export const router = createBrowserRouter([
  {
    path: "/login",
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
  {
    path: "/kasir",
    element: <Kasir />,
  },
  {
    path: "/produk",
    element: <Produk />,
  },
  {
    path: "/histori",
    element: <Histori />,
  },
  {
    path: "/pelanggan",
    element: <Pelanggan />,
  },
]);
