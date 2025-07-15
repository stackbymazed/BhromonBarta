import React from "react";
import { FaGlobeAsia, FaUserFriends, FaRoute } from "react-icons/fa";

const DashboardWel = () => {
  return (
    <div className="flex items-center justify-center h-[80vh] px-4">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-10 max-w-3xl text-center">
        <div className="flex justify-center mb-6">
          <FaGlobeAsia className="text-5xl text-green-500" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Welcome to Your Travel Dashboard
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-base mb-6 max-w-2xl mx-auto">
          Manage all your travel activities in one place — whether you're booking
          your next adventure, managing tour assignments, or organizing tourist data.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
          <div className="bg-gray-100 dark:bg-gray-700 p-5 rounded-xl shadow-md">
            <FaUserFriends className="text-3xl text-blue-500 mx-auto mb-3" />
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Tourists</h4>
            <p className="text-sm text-gray-500 dark:text-gray-300">Book and track your tours easily.</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-5 rounded-xl shadow-md">
            <FaRoute className="text-3xl text-orange-500 mx-auto mb-3" />
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Tour Guides</h4>
            <p className="text-sm text-gray-500 dark:text-gray-300">Manage your assigned tours efficiently.</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-5 rounded-xl shadow-md">
            <FaGlobeAsia className="text-3xl text-green-500 mx-auto mb-3" />
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Admins</h4>
            <p className="text-sm text-gray-500 dark:text-gray-300">Oversee bookings, users, and operations.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardWel;
