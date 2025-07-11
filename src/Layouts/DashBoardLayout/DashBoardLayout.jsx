import React from 'react';
import { NavLink, Outlet } from 'react-router';
import { FaUser, FaBook, FaPlus, FaEdit, FaUserTie, FaSuitcase, FaList, FaUserCog, FaMapMarkedAlt, FaPlusCircle } from "react-icons/fa";
import Logo from '../../Utilis/Logo/Logo';
import useAdmin from '../../hooks/useAdmin';
import useTourist from '../../hooks/useTourist';
import useGuide from '../../hooks/useGuide';
import Loading from '../../Utilis/Loading/Loading';

const DashBoardLayout = () => {
    const { isAdmin } = useAdmin()
    const { isTourist } = useTourist()
    const { isGuide } = useGuide()
    // console.log(isAdmin)
    const linkStyle = ({ isActive }) =>
        isActive
            ? "flex items-center gap-2 text-white bg-blue-600 px-4 py-2 rounded"
            : "flex items-center gap-2 text-gray-700 hover:bg-blue-100 px-4 py-2 rounded";

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

            {/* Main content */}
            <div className="drawer-content flex flex-col bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-800 transition-colors duration-500 min-h-screen">
                {/* Top Navbar */}
                <div className="navbar bg-gradient-to-r from-blue-100 via-white to-blue-50 dark:from-gray-900 dark:to-gray-800 w-full lg:hidden shadow">
                    <div className="flex-none">
                        <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2">
                        <NavLink to='/'><Logo /></NavLink>
                    </div>
                </div>

                {/* Route Outlet */}
                <Outlet />
            </div>

            {/* Sidebar */}
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

                <ul className="menu bg-gradient-to-b from-blue-100 via-blue-200 to-blue-300 dark:from-gray-800 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100 min-h-full w-72 p-4 shadow-xl space-y-4">

                    {/* Logo Section */}
                    <div className="mb-10">
                        <NavLink to='/'>
                            <Logo></Logo>
                        </NavLink>
                    </div>

                    {/* Sidebar Links */}
                    <aside className="w-64 bg-white shadow-md p-5">
                        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Dashboard</h2>
                        <nav className="flex flex-col gap-2">

                            {/* normal user  route */}

                            {
                                isTourist ? <>
                                    <NavLink to="profile" className={linkStyle}>
                                        <FaUser /> Manage Profile
                                    </NavLink>
                                    <NavLink to="bookings" className={linkStyle}>
                                        <FaBook /> My Bookings
                                    </NavLink>
                                    <NavLink to="manage-stories" className={linkStyle}>
                                        <FaEdit /> Manage Stories
                                    </NavLink>
                                    <NavLink to="add-story" className={linkStyle}>
                                        <FaPlus /> Add Stories
                                    </NavLink>
                                    <NavLink to="tour-guide" className={linkStyle}>
                                        <FaUserTie /> Join as Tour Guide
                                    </NavLink>
                                </> : ''
                            }

                            {/* <div className="divider">OR</div> */}

                            {/* guider route */}
                            {
                                isGuide ? <>
                                    <NavLink to="/dashboard/profileGuide" className={linkStyle}>
                                        <FaUser /> Manage Profile
                                    </NavLink>

                                    <NavLink to="/dashboard/assigned-tours" className={linkStyle}>
                                        <FaSuitcase /> My Assigned Tours
                                    </NavLink>

                                    <NavLink to="/dashboard/add-story" className={linkStyle}>
                                        <FaPlus /> Add Stories
                                    </NavLink>

                                    <NavLink to="/dashboard/manage-stories" className={linkStyle}>
                                        <FaList /> Manage Stories
                                    </NavLink>
                                </> : ''
                            }


                            {/* <div className="divider">OR</div> */}
                            {/* admin er route */}
                            {
                                isAdmin ?
                                    <>
                                        <NavLink to="/dashboard/manage-profile" className={linkStyle}>
                                            <FaUserCog /> Manage Profile
                                        </NavLink>
                                        <NavLink to="/dashboard/manage-users" className={linkStyle}>
                                            <FaUserCog /> Manage Users
                                        </NavLink>
                                        <NavLink to="/dashboard/manage-candidates" className={linkStyle}>
                                            <FaUserCog /> Manage Candidates
                                        </NavLink>
                                        <NavLink to="/dashboard/add-package" className={linkStyle}>
                                            <FaPlusCircle /> Add Package
                                        </NavLink>

                                        <NavLink to="/dashboard/add-story" className={linkStyle}>
                                            <FaPlusCircle /> Add Stories
                                        </NavLink>

                                        <NavLink to="/dashboard/manage-stories" className={linkStyle}>
                                            <FaList /> Manage Stories
                                        </NavLink>
                                    </> : ''
                            }
                        </nav>
                    </aside>
                </ul>
            </div>
        </div>
    );
};

export default DashBoardLayout;
