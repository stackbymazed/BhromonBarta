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
import { MapPin, DollarSign, Globe, BookOpen } from "lucide-react";

const MyActivity = () => {
  // ===== Static User Data =====
  const stats = [
    { title: "Total Tours", value: 12, icon: MapPin, color: "from-blue-500 to-blue-400" },
    { title: "Total Spent", value: "৳58,000", icon: DollarSign, color: "from-green-500 to-green-400" },
    { title: "Places Visited", value: 7, icon: Globe, color: "from-purple-500 to-purple-400" },
    { title: "Stories Added", value: 5, icon: BookOpen, color: "from-pink-500 to-pink-400" },
  ];

  // Monthly tours (for line chart)
  const monthlyTours = [
    { month: "Jan", tours: 1 },
    { month: "Feb", tours: 2 },
    { month: "Mar", tours: 1 },
    { month: "Apr", tours: 0 },
    { month: "May", tours: 3 },
    { month: "Jun", tours: 2 },
    { month: "Jul", tours: 1 },
    { month: "Aug", tours: 2 },
  ];

  // Places visited frequency
  const placesVisited = [
    { place: "Cox's Bazar", visits: 3 },
    { place: "Sundarbans", visits: 2 },
    { place: "Sylhet", visits: 1 },
    { place: "Bandarban", visits: 2 },
    { place: "Dhaka City", visits: 4 },
    { place: "Rangamati", visits: 1 },
  ];

  // Expense distribution
  const expenseDistribution = [
    { name: "Transport", value: 18000 },
    { name: "Food", value: 12000 },
    { name: "Accommodation", value: 20000 },
    { name: "Others", value: 8000 },
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
              {/* Gradient top bar */}
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
            Monthly Tours
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyTours}>
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="tours"
                stroke="#3b82f6"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
            Places Visited
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={placesVisited}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="place" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="visits" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md md:col-span-2">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
            Expense Breakdown
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expenseDistribution}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {expenseDistribution.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default MyActivity;
