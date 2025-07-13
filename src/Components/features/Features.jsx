import React from "react";
import { motion } from "framer-motion";
import { FaRegMoneyBillAlt, FaMapMarkedAlt, FaRegCalendarCheck, FaHandshake, FaUserTie, FaHeadset } from "react-icons/fa";

const features = [
  {
    icon: <FaRegMoneyBillAlt className="text-4xl text-red-500" />,
    title: "High Quality Travel Packages",
    description: "Credibly target visionary portals rather than prospective human capital.",
  },
  {
    icon: <FaMapMarkedAlt className="text-4xl text-red-500" />,
    title: "Best Travel Plan",
    description: "Credibly target visionary portals rather than prospective human capital.",
  },
  {
    icon: <FaRegCalendarCheck className="text-4xl text-red-500" />,
    title: "Easy & Quick Booking",
    description: "Credibly target visionary portals rather than prospective human capital.",
  },
  {
    icon: <FaHandshake className="text-4xl text-red-500" />,
    title: "Hand-picked Tour",
    description: "Credibly target visionary portals rather than prospective human capital.",
  },
  {
    icon: <FaUserTie className="text-4xl text-red-500" />,
    title: "Private Guide",
    description: "Credibly target visionary portals rather than prospective human capital.",
  },
  {
    icon: <FaHeadset className="text-4xl text-red-500" />,
    title: "Customer Care 24/7",
    description: "Credibly target visionary portals rather than prospective human capital.",
  },
];

// Framer Motion Animation
const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
    },
  }),
};

const Features = () => {
  return (
    <section className="bg-base-100 py-16 px-4 md:px-16">
      {/* HEADER */}
      <div className="text-center mb-12">
        <p className="text-red-500 font-semibold text-lg">Features</p>
        <h2 className="text-3xl font-bold text-gray-800">Why Choose Us</h2>
      </div>

      {/* FEATURES GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((item, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={cardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="bg-white shadow-2xl rounded-lg p-6 hover:shadow-xl transition duration-300"
          >
            <div className="mb-4">{item.icon}</div>
            <h3 className="font-bold text-md md:text-lg text-gray-900">{item.title}</h3>
            <p className="text-gray-600 mt-2 text-sm">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;