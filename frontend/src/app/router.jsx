import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout";

import Home from "../pages/Home";
import Orders from "../pages/Orders";
import Profile from "../pages/Profile";
import Product from "../pages/Product";
import Admin from "../pages/Admin";
import AdminRoute from "../components/AdminRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/orders", element: <Orders /> },
      { path: "/profile", element: <Profile /> },
      { path: "/product/:id", element: <Product /> },
      { path: "/admin", element: <Admin /> },
    ],
  },
]);