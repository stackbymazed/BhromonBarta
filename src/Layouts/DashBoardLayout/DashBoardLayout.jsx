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
                <div className='min-h-[80vh]'>
                    <Outlet />
                </div>
                <footer className="bg-gradient-to-b  from-blue-100 via-blue-200 to-blue-300 text-black py-6 mt-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">

                        <div className="text-center md:text-left">
                            <h2 className="text-lg font-semibold text-black">BhromonBarta</h2>
                            <p className="text-sm text-black">© 2025 All rights reserved.</p>
                        </div>

                        <div className="flex space-x-6">
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                                <svg className="w-6 h-6 text-blue-600 hover:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.897v-2.89h2.541V9.797c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.462h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z" />
                                </svg>
                            </a>

                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                                <svg className="w-6 h-6 text-sky-400 hover:text-sky-300" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 4.557a9.835 9.835 0 01-2.828.775A4.932 4.932 0 0023.337 3c-.951.564-2.005.974-3.127 1.195A4.92 4.92 0 0016.616 3c-2.736 0-4.95 2.214-4.95 4.95 0 .388.044.765.127 1.125-4.113-.206-7.766-2.177-10.21-5.172a4.93 4.93 0 00-.668 2.488c0 1.715.873 3.23 2.197 4.116a4.904 4.904 0 01-2.243-.62v.063c0 2.396 1.704 4.396 3.963 4.85a4.935 4.935 0 01-2.237.085 4.935 4.935 0 004.6 3.417 9.874 9.874 0 01-6.102 2.105c-.396 0-.787-.023-1.172-.068A13.933 13.933 0 007.548 21c9.057 0 14.01-7.504 14.01-14.01 0-.213-.005-.425-.014-.636A10.01 10.01 0 0024 4.557z" />
                                </svg>
                            </a>

                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                                <svg className="w-6 h-6 text-pink-500 hover:text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.36 3.608 1.335.975.975 1.273 2.242 1.335 3.608.058 1.266.07 1.645.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.36 2.633-1.335 3.608-.975.975-2.242 1.273-3.608 1.335-1.266.058-1.645.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.36-3.608-1.335-.975-.975-1.273-2.242-1.335-3.608C2.175 15.647 2.163 15.268 2.163 12s.012-3.584.07-4.85c.062-1.366.36-2.633 1.335-3.608C4.543 2.593 5.81 2.295 7.176 2.233 8.442 2.175 8.821 2.163 12 2.163zm0 1.838c-3.137 0-3.502.012-4.73.068-1.144.052-1.758.24-2.169.399a3.993 3.993 0 00-1.476.962 3.993 3.993 0 00-.962 1.476c-.159.411-.347 1.025-.399 2.169-.056 1.228-.068 1.593-.068 4.73s.012 3.502.068 4.73c.052 1.144.24 1.758.399 2.169a3.993 3.993 0 00.962 1.476 3.993 3.993 0 001.476.962c.411.159 1.025.347 2.169.399 1.228.056 1.593.068 4.73.068s3.502-.012 4.73-.068c1.144-.052 1.758-.24 2.169-.399a3.993 3.993 0 001.476-.962 3.993 3.993 0 00.962-1.476c.159-.411.347-1.025.399-2.169.056-1.228.068-1.593.068-4.73s-.012-3.502-.068-4.73c-.052-1.144-.24-1.758-.399-2.169a3.993 3.993 0 00-.962-1.476 3.993 3.993 0 00-1.476-.962c-.411-.159-1.025-.347-2.169-.399-1.228-.056-1.593-.068-4.73-.068zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
                                </svg>
                            </a>

                            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                                <svg className="w-6 h-6 text-red-600 hover:text-red-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M10 15l5.19-3L10 9v6z" />
                                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878V15H7.897v-2.89h2.541V9.797c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.462h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </footer>

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
