import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Map, DollarSign, Users, Star } from "lucide-react";

const GuideActivityDashboard = () => {
  // ===== Static Guide Data =====
  const stats = [
    { title: "Tours Guided", value: 42, icon: Map, color: "from-blue-500 to-blue-400" },
    { title: "Total Earnings", value: "৳1,45,000", icon: DollarSign, color: "from-green-500 to-green-400" },
    { title: "Tourists Served", value: 280, icon: Users, color: "from-purple-500 to-purple-400" },
    { title: "Avg. Rating", value: "4.7 ⭐", icon: Star, color: "from-pink-500 to-pink-400" },
  ];

  // Monthly tours (Line chart)
  const monthlyTours = [
    { month: "Jan", tours: 3 },
    { month: "Feb", tours: 5 },
    { month: "Mar", tours: 4 },
    { month: "Apr", tours: 2 },
    { month: "May", tours: 6 },
    { month: "Jun", tours: 7 },
    { month: "Jul", tours: 8 },
    { month: "Aug", tours: 7 },
  ];

  // Places guided (Bar chart)
  const placesGuided = [
    { place: "Cox's Bazar", tours: 12 },
    { place: "Sundarbans", tours: 8 },
    { place: "Sylhet", tours: 5 },
    { place: "Bandarban", tours: 7 },
    { place: "Dhaka City", tours: 6 },
    { place: "Rangamati", tours: 4 },
  ];

  // Earnings breakdown (Pie chart)
  const earningsDistribution = [
    { name: "Guide Fee", value: 60000 },
    { name: "Transport", value: 25000 },
    { name: "Accommodation", value: 40000 },
    { name: "Others", value: 20000 },
  ];

  // Tourists Served by Age Group (Extra Chart)
  const ageGroups = [
    { age: "18-25", tourists: 80 },
    { age: "26-35", tourists: 120 },
    { age: "36-50", tourists: 60 },
    { age: "50+", tourists: 20 },
  ];

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl space-y-8">
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="relative bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md hover:shadow-xl transition overflow-hidden group"
            >
              {/* Gradient Top Bar */}
              <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${stat.color}`}></div>

              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r ${stat.color} text-white mb-4 group-hover:scale-110 transition`}
              >
                <Icon size={24} />
              </div>

              {/* Value */}
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                {stat.value}
              </h3>

              {/* Title */}
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {stat.title}
              </p>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
            Monthly Tours Guided
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyTours}>
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="tours" stroke="#3b82f6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
            Tours by Place
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={placesGuided}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="place" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="tours" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
            Earnings Breakdown
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={earningsDistribution}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {earningsDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Extra Chart: Tourists by Age Group */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
            Tourists by Age Group
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ageGroups}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="age" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="tourists" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default GuideActivityDashboard;
