import React from "react";
import { FaCheck, FaMapMarkedAlt, FaSuitcaseRolling, FaUsers, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router"; // react-router v6

// Stats Data with Icons
const stats = [
  { value: "120+", label: "Total Destination", icon: <FaMapMarkedAlt className="text-blue-600 text-xl" /> },
  { value: "500+", label: "Travel Packages", icon: <FaSuitcaseRolling className="text-green-600 text-xl" /> },
  { value: "12k+", label: "Total Travelers", icon: <FaUsers className="text-purple-600 text-xl" /> },
  { value: "7k+", label: "Positive Reviews", icon: <FaStar className="text-yellow-500 text-xl" /> },
];

// Duplicate for smooth loop
const loopStats = [...stats, ...stats, ...stats];

const WhyChooseUs = () => {
  return (
    <section className="py-16 px-4 md:px-16 overflow-hidden dark:text-white">
      {/* TOP SECTION */}
      <div className="grid md:grid-cols-2 items-center gap-12">
        {/* IMAGE BLOCK */}
        <div className="relative max-w-[320px] mx-auto">
          <div className="bg-yellow-400 w-[90%] h-[90%] absolute left-3 top-3 -z-10 rounded-lg"></div>
          <img
            src="https://i.ibb.co/LdCsmy8j/choos-us-thumb.png"
            alt="Traveler"
            className="w-full h-[360px] object-contain rounded-lg border-4 border-gray-100 shadow-2xl hover:shadow-md transition"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 mt-4 rounded-lg w-fit font-bold text-md italic shadow-lg"
          >
            <span className="text-2xl font-extrabold mr-1">4+</span>Years of Experience
          </motion.div>
        </div>

        {/* TEXT BLOCK */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-800 dark:text-white">
            Plan Your Trip with BhromonBarta
          </h2>
          <p className="text-gray-600 dark:text-white mt-4 text-md leading-relaxed">
            Holistically optimize proactive strategic theme areas rather than effective manufactured products create.
          </p>

          {/* Features with Check Icons */}
          <div className="grid grid-cols-2 gap-3 mt-6 text-gray-700 dark:text-white">
            <p><FaCheck className="inline text-blue-700 mr-2" /> Travel Plan</p>
            <p><FaCheck className="inline text-blue-700 mr-2" /> Cheap Rates</p>
            <p><FaCheck className="inline text-blue-700 mr-2" /> Hand-picked Tour</p>
            <p><FaCheck className="inline text-blue-700 mr-2" /> Private Guide</p>
          </div>

          <Link to="/about">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-outline mt-6 dark:text-white border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              Contact Us
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* BOTTOM STATS SECTION */}
      <div className="mt-20 pt-6 overflow-hidden relative border-t border-gray-200 dark:border-gray-700">
        {/* Optional background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-white to-blue-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 opacity-70 z-[-1]" />

        <motion.div
          className="flex gap-10 whitespace-nowrap"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 40,
            ease: "linear",
          }}
        >
          {loopStats.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1 }}
              className="min-w-[200px] bg-white dark:bg-gray-800 shadow-md p-5 rounded-xl text-center flex flex-col items-center"
            >
              <div className="mb-2">{item.icon}</div>
              <p className="text-2xl font-bold italic text-black dark:text-white">{item.value}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
