import { createBrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import User from "./components/User";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      { index: true, element: <Home /> },
      { path: "aboutus", element: <AboutUs /> },
      { path: "user", element: <User /> },
    ],
  },
]);

export default router;
