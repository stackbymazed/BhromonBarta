import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useNavigate } from 'react-router';
import useAxiosSecure from "../../hooks/useAxiosSecure";

const TravelGuide = () => {
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const [packages, setPackages] = useState([]);
    const [guides, setGuides] = useState([]);

    useEffect(() => {
        axiosSecure.get("/packages")
            .then(res => setPackages(res.data))
            .catch(err => console.error(err));

        axiosSecure.get("/tour-guides")
            .then(res => setGuides(res.data))
            .catch(err => console.error(err));
    }, [axiosSecure]);

    return (
        <motion.div
            className="px-4 py-10 max-w-7xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
        >
            <motion.h1
                className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
            >
                Tourism and Travel Guide - Bangladesh
            </motion.h1>

            <Tabs>
                <TabList className="flex border-b-2 border-blue-500 rounded-t-lg overflow-hidden text-base font-semibold mb-6  dark:bg-gray-900">
                    <Tab
                        className="py-3 px-6 cursor-pointer transition-all duration-300 text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900"
                        selectedClassName="bg-blue-500 text-white shadow-md border-b-0"
                    >
                        Our Packages
                    </Tab>
                    <Tab
                        className="py-3 px-6 cursor-pointer transition-all duration-300 text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900"
                        selectedClassName="bg-blue-500 text-white shadow-md border-b-0"
                    >
                        Meet Our Tour Guides
                    </Tab>
                </TabList>

                {/* Packages */}
                <TabPanel>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {packages.map((pkg, index) => (
                            <motion.div
                                key={pkg._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.08 }}
                                viewport={{ once: true }}
                                className="
        group bg-white dark:bg-gray-900
        rounded-2xl overflow-hidden
        shadow-md hover:shadow-2xl
        transition-all duration-300
        flex flex-col h-full
      "
                            >
                                {/* IMAGE */}
                                <div className="relative overflow-hidden">
                                    <img
                                        src={pkg?.gallery?.[0] || "https://via.placeholder.com/400x300?text=No+Image"}
                                        alt={pkg.title}
                                        className="
            w-full h-52 object-cover
            group-hover:scale-110 transition-transform duration-700
          "
                                    />

                                    {/* IMAGE OVERLAY */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />

                                    {/* PRICE BADGE */}
                                    <span
                                        className="
            absolute top-4 right-4
            bg-blue-600/95 text-white
            px-3 py-1 rounded-full
            text-sm font-semibold shadow
          "
                                    >
                                        ৳ {pkg.price}
                                    </span>
                                </div>

                                {/* CONTENT */}
                                <div className="p-5 flex flex-col flex-1">
                                    {/* TITLE */}
                                    <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white mb-1 line-clamp-1">
                                        {pkg.title}
                                    </h3>

                                    {/* TYPE */}
                                    <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
                                        {pkg.status}
                                    </p>

                                    {/* DESCRIPTION (if available) */}
                                    {pkg.about && (
                                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
                                            {pkg.about}
                                        </p>
                                    )}

                                    {/* META */}
                                    <div className="mt-auto flex items-center justify-between text-sm text-gray-700 dark:text-gray-300">
                                        <span className="flex items-center gap-1">
                                            ⏱ <span className="font-medium">{pkg.duration} Days</span>
                                        </span>
                                        <span className="text-blue-600 dark:text-blue-400 font-semibold">
                                            Best Deal
                                        </span>
                                    </div>

                                    {/* CTA */}
                                    <button
                                        onClick={() => navigate(`/packages/${pkg._id}`)}
                                        className="
            mt-5 w-full
            bg-gradient-to-r from-blue-500 to-blue-600
            hover:from-blue-600 hover:to-blue-700
            text-white py-2.5 rounded-lg
            font-semibold tracking-wide
            transition
          "
                                    >
                                        View Package
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </TabPanel>

                {/* Tour Guides */}
                <TabPanel>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                        {guides.length === 0 ? (
                            <motion.div
                                className="text-center text-gray-400 dark:text-gray-500 italic col-span-3"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                No tour guides found.
                            </motion.div>
                        ) : (
                            guides.map((guide, index) => (
                                <motion.div
                                    key={guide._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.08 }}
                                    viewport={{ once: true }}
                                    className="
          group bg-white dark:bg-gray-900
          rounded-2xl overflow-hidden
          shadow-md hover:shadow-2xl
          transition-all duration-300
          flex flex-col items-center
          p-6 text-center
        "
                                >
                                    {/* PROFILE IMAGE */}
                                    <div className="relative">
                                        <img
                                            src={guide.photoURL || "https://via.placeholder.com/400x300?text=No+Image"}
                                            alt={guide.name}
                                            className="
              w-28 h-28 object-cover rounded-full
              border-4 border-blue-500
              group-hover:scale-105 transition-transform duration-500
            "
                                        />

                                        {/* ONLINE DOT (optional style element) */}
                                        <span
                                            className="
              absolute bottom-1 right-1
              w-3 h-3 rounded-full
              bg-green-500 border-2 border-white
            "
                                        />
                                    </div>

                                    {/* INFO */}
                                    <h2 className="mt-4 text-lg font-bold text-gray-800 dark:text-white">
                                        {guide.name}
                                    </h2>

                                    <p className="text-sm text-gray-600 dark:text-gray-400 break-all">
                                        {guide.email}
                                    </p>

                                    {/* CTA */}
                                    <button
                                        onClick={() => navigate(`/singleGuide/${guide._id}`)}
                                        className="
            mt-5 px-6 py-2 rounded-full
            bg-gradient-to-r from-blue-500 to-blue-600
            hover:from-blue-600 hover:to-blue-700
            text-white font-semibold
            transition
          "
                                    >
                                        View Profile
                                    </button>
                                </motion.div>
                            ))
                        )}
                    </div>

                </TabPanel>
            </Tabs>
        </motion.div>
    );
};

export default TravelGuide;
