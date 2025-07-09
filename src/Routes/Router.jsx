import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout/RootLayout";
import Home from "../pages/Home/Home";
import AboutUs from "../pages/AboutUs/AboutUs";
import Community from "../pages/Community/Community";
import SignIn from "../Layouts/AuthLayout/SignIn";
import SignUp from "../Layouts/AuthLayout/SignUp";


const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: 'about',
        Component: AboutUs
      },
      {
        path: 'community',
        Component: Community
      },
      {
        path: 'signIn',
        Component: SignIn
      },
      {
        path: 'signUp',
        Component: SignUp
      }
    ]
  },

]);

export default router;