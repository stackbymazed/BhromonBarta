import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../Contexts/AuthContext/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Utilis/Loading/Loading";
import Swal from "sweetalert2";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FaUsers, FaMoneyBillWave, FaMapMarkedAlt, FaBook } from "react-icons/fa";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#f43f5e"];

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [totalPayData, setTotalPayData] = useState(0);

  // Fetch stats
  const { data: stats } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard/stats");
      return res.data;
    },
  });

  // Fetch payments
  const { data: paymentsData = [] } = useQuery({
    queryKey: ["/payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });

  useEffect(() => {
    if (paymentsData.length > 0) {
      const total = paymentsData.reduce((sum, p) => sum + p.amount, 0);
      setTotalPayData(total);
    }
  }, [paymentsData]);

  // Fetch admin profile
  const { data: adminData, isLoading: loadingAdmin, refetch } = useQuery({
    queryKey: ["admin-info", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const { _id, ...updateFields } = editData;
    try {
      await axiosSecure.patch(`/users/update/${updateFields?.email}`, updateFields);
      Swal.fire("Updated!", "Profile updated successfully.", "success");
      setModalOpen(false);
      refetch();
    } catch (error) {
      Swal.fire("Error", "Something went wrong.", "error");
    }
  };

  if (loadingAdmin) return <Loading />;

  // Sample Chart Data
  const userData = [
    { month: "Jan", users: 20, guides: 5, tours: 12, stories: 8, property: 3 },
    { month: "Feb", users: 25, guides: 7, tours: 15, stories: 12, property: 2 },
    { month: "Mar", users: 30, guides: 8, tours: 18, stories: 15, property: 5 },
    { month: "Apr", users: 18, guides: 4, tours: 10, stories: 6, property: 1 },
    { month: "May", users: 35, guides: 9, tours: 20, stories: 18, property: 4 },
    { month: "Jun", users: 40, guides: 10, tours: 22, stories: 20, property: 6 },
  ];

  const pieData = [
    { name: "Users", value: stats?.users || 0 },
    { name: "Guides", value: stats?.guide || 0 },
    { name: "Tours", value: stats?.packages || 0 },
    { name: "Stories", value: stats?.stories || 0 },
    { name: "Property", value: stats?.property || 0 },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Welcome, {adminData?.name}</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 dark:text-black">
        <StatCard icon={<FaMoneyBillWave />} label="Total Payment" value={`$${totalPayData || 0}`} color="bg-blue-100" />
        <StatCard icon={<FaUsers />} label="Total Users" value={stats?.users} color="bg-green-100" />
        <StatCard icon={<FaMapMarkedAlt />} label="Total Guides" value={stats?.guide} color="bg-yellow-100" />
        <StatCard icon={<FaBook />} label="Total Tours" value={stats?.packages} color="bg-purple-100" />
        <StatCard icon={<FaBook />} label="Total Stories" value={stats?.stories} color="bg-pink-100" />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Monthly Activity</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={userData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#3b82f6" />
              <Line type="monotone" dataKey="guides" stroke="#10b981" />
              <Line type="monotone" dataKey="tours" stroke="#f59e0b" />
              <Line type="monotone" dataKey="stories" stroke="#ef4444" />
              <Line type="monotone" dataKey="property" stroke="#8b5cf6" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Overall Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Profile Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow flex flex-col md:flex-row items-center gap-6">
        <img
          src={user?.photoURL}
          alt="Admin"
          className="w-40 h-40 object-cover rounded-full border-4 border-blue-500"
        />
        <div className="flex-1">
          <h3 className="text-2xl font-semibold">{adminData?.name}</h3>
          <p><strong>Email:</strong> {adminData?.email}</p>
          <p><strong>Role:</strong> {adminData?.role}</p>
          <p><strong>Phone:</strong> {adminData?.phone || 'N/A'}</p>
          <p><strong>Address:</strong> {adminData?.address || 'N/A'}</p>
          <button
            className="mt-4 px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg hover:from-blue-600 hover:to-blue-800 transition"
            onClick={() => {
              setEditData(adminData);
              setModalOpen(true);
            }}
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <EditProfileModal
          editData={editData}
          setEditData={setEditData}
          handleEditSubmit={handleEditSubmit}
          setModalOpen={setModalOpen}
          user={user}
        />
      )}
    </div>
  );
};

// StatCard Component
const StatCard = ({ icon, label, value, color }) => (
  <div className={`flex flex-col items-center justify-center p-5 rounded-xl shadow-md hover:shadow-lg transition ${color}`}>
    <div className="text-3xl mb-2">{icon}</div>
    <div className="text-xl font-bold">{value}</div>
    <div className="text-gray-600 mt-1 text-sm">{label}</div>
  </div>
);

const EditProfileModal = ({ editData, setEditData, handleEditSubmit, setModalOpen, user }) => (
  <div className="fixed inset-0 flex justify-center items-center z-50">
    {/* Overlay with blur */}
    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

    {/* Modal content */}
    <form
      onSubmit={handleEditSubmit}
      className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4 z-10"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-4">
        Edit Profile
      </h2>

      {/* Profile Image */}
      <div className="flex justify-center mb-4">
        <img
          src={editData.photoURL || user?.photoURL}
          alt="Profile Preview"
          className="w-28 h-28 object-cover rounded-full border-4 border-blue-500 shadow-md"
        />
      </div>

      {/* Form Fields */}
      <input
        type="text"
        value={editData.name}
        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
        placeholder="Name"
        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="text"
        value={editData.photoURL}
        onChange={(e) => setEditData({ ...editData, photoURL: e.target.value })}
        placeholder="Photo URL"
        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="number"
        value={editData.phone || ""}
        onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
        placeholder="Phone"
        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        value={editData.address || ""}
        onChange={(e) => setEditData({ ...editData, address: e.target.value })}
        placeholder="Address"
        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 mt-4">
        <button
          type="button"
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
          onClick={() => setModalOpen(false)}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-700 text-white rounded hover:from-green-600 hover:to-green-800 transition"
        >
          Save
        </button>
      </div>
    </form>
  </div>
);


export default AdminDashboard;
