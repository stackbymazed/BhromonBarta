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
import AddPackage from "../pages/Dashboard/AddPackage/AddPackage";
import PackageDetails from "../pages/PackageDetails/PackageDetails";
import AdminRoute from "../Utilis/AdminRoute/AdminRoute";
import AdminProfile from "../pages/Dashboard/AdminProfile/AdminProfile";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import ManageCandidates from "../pages/Dashboard/ManageCandidates/ManageCandidates";
import ProfileGuide from "../pages/Dashboard/ProfileGuide/ProfileGuide";
import AllStories from "../pages/AllStories/AllStories";
import SingleStories from "../pages/SingleStories/SingleStories";
import GuideDetails from "../pages/GuideDetails/GuideDetails";
import Trips from "../pages/Trips/Trips";
import PrivateRoute from "../Utilis/PrivateRoute/PrivateRoute";


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
        path: 'trips',
        Component: Trips
      },
      {
        path: 'signIn',
        Component: SignIn
      },
      {
        path: 'signUp',
        Component: SignUp
      },
      {
        path: '/packages/:id',
        Component: PackageDetails
      },
      {
        path: 'allStories',
        Component: AllStories
      },
      {
        path: 'story/:id',
        Component: SingleStories
      },
      {
        path: 'singleGuide/:id',
        Component: GuideDetails
      },
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute>
      <DashBoardLayout></DashBoardLayout>
    </PrivateRoute>,
    children: [
      {
        index:true,
        path: 'profile',
        Component: Profile
      },
      {
        path: 'bookings',
        Component: MyBooking
      },
      {
        path: 'profileGuide',
        Component: ProfileGuide
      },
      {
        path: 'manage-stories',
        Component: ManageStories
      },
      {
        path: 'add-story',
        Component: AddStories
      },
      {
        path: 'tour-guide',
        Component: JoinGuide
      },
      {
        path: 'assigned-tours',
        Component: MyAssignedTours
      },
      {
        path: 'add-package',
        element: <AdminRoute>
          <AddPackage></AddPackage>
        </AdminRoute>
      },
      {
        path: 'manage-profile',
        Component: AdminProfile
      },
      {
        path: 'manage-users',
        Component: ManageUsers
      },
      {
        path: 'manage-candidates',
        Component: ManageCandidates
      }

    ]
  }

]);

export default router;