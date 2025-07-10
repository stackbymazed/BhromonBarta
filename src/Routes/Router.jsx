import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout/RootLayout";
import Home from "../pages/Home/Home";
import AboutUs from "../pages/AboutUs/AboutUs";
import Community from "../pages/Community/Community";
import SignIn from "../Layouts/AuthLayout/SignIn";
import SignUp from "../Layouts/AuthLayout/SignUp";
import DashBoardLayout from "../Layouts/DashBoardLayout/DashBoardLayout";
import Profile from "../pages/Dashboard/Profile/Profile";
import MyBooking from "../pages/Dashboard/MyBooking/MyBooking";
import ManageStories from "../pages/Dashboard/ManageStories/ManageStories";
import AddStories from "../pages/Dashboard/AddStories/AddStories";
import JoinGuide from "../pages/Dashboard/JoinGuide/JoinGuide";
import MyAssignedTours from "../pages/Dashboard/MyAssignedTours/MyAssignedTours";


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
  {
    path:'dashboard',
    Component:DashBoardLayout,
    children:[
      {
        path:'profile',
        Component:Profile
      },
      {
        path:'bookings',
        Component: MyBooking
      },
      {
        path:'manage-stories',
        Component:ManageStories
      },
      {
        path:'add-story',
        Component:AddStories
      },
      {
        path:'tour-guide',
        Component: JoinGuide
      },
      {
        path:'assigned-tours',
        Component: MyAssignedTours
      },

    ]
  }

]);

export default router;