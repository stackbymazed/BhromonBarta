import React from "react";
import { FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router";

const stats = [
  { value: "120+", label: "Total Destination" },
  { value: "500+", label: "Travel Packages" },
  { value: "12k+", label: "Total Travelers" },
  { value: "7k+", label: "Positive Reviews" },
];

// Optional: Duplicate stats for smooth infinite loop
const loopStats = [...stats, ...stats];

const WhyChooseUs = () => {
  return (
    <section className="bg-base-100 py-12 px-4 md:px-16 overflow-hidden">
      {/* TOP SECTION */}
      <div className="grid md:grid-cols-2 items-center gap-12">
        {/* IMAGE BLOCK */}
        <div className="relative max-w-[320px] mx-auto">
          <div className="bg-yellow-400 w-[90%] h-[90%] absolute left-3 top-3 -z-10 rounded-lg"></div>
          <img
            src="https://i.ibb.co/LdCsmy8j/choos-us-thumb.png"
            alt="Traveler"
            className="w-full h-[360px] object-contain rounded-lg border-4 border-gray-100 shadow-2xl hover:shadow-2xs"
          />
          <div className="bg-blue-900 text-white px-4 py-2 mt-4 rounded-lg w-fit font-bold text-md italic">
            <span className="text-2xl font-extrabold mr-1">10+</span>Years of Experience
          </div>
        </div>

        {/* TEXT BLOCK */}
        <div>
          {/* <p className="font-bold text-blue-700 text-lg">Why Choose Us</p> */}
          <h2 className="text-3xl font-bold mt-2">Plan Your Trip with BhromonBarta</h2>
          <p className="text-gray-600 mt-4">
            Holistically optimize proactive strategic theme areas rather than effective
            manufactured products create.
          </p>
          <div className="grid grid-cols-2 gap-3 mt-6">
            <p>
              <FaCheck className="inline text-blue-700 mr-2" />
              Travel Plan
            </p>
            <p>
              <FaCheck className="inline text-blue-700 mr-2" />
              Cheap Rates
            </p>
            <p>
              <FaCheck className="inline text-blue-700 mr-2" />
              Hand-picked Tour
            </p>
            <p>
              <FaCheck className="inline text-blue-700 mr-2" />
              Private Guide
            </p>
          </div>
          <Link to='about'>
            <button className="btn btn-outline mt-6">Contact Us</button>
          </Link>
        </div>
      </div>

      {/* BOTTOM STATS SECTION - INFINITE SCROLL */}
      <div className="mt-20 pt-6 overflow-hidden relative whitespace-nowrap border-t">
        <motion.div
          className="flex gap-10"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          }}
        >
          {loopStats.map((item, i) => (
            <div
              key={i}
              className="min-w-[180px] bg-white shadow-md p-4 rounded-lg text-center"
            >
              <p className="text-2xl font-bold italic text-black">{item.value}</p>
              <p className="text-gray-600 text-sm mt-1">{item.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;