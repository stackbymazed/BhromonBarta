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
                    <div
                        key={packages._id}
                        className="
    group bg-white dark:bg-gray-900
    rounded-2xl overflow-hidden
    shadow-md hover:shadow-2xl
    transition-all duration-300
    flex flex-col
  "
                    >
                        {/* IMAGE */}
                        <div className="relative overflow-hidden">
                            <img
                                src={packages.gallery?.[0]}
                                alt={packages.title}
                                className="
        h-52 w-full object-cover
        group-hover:scale-105 transition-transform duration-500
      "
                            />

                            {/* PRICE BADGE */}
                            <div
                                className="
        absolute top-4 right-4
        bg-blue-600 text-white
        px-3 py-1 rounded-full
        text-sm font-semibold shadow
      "
                            >
                                ৳{packages.price}
                            </div>
                        </div>

                        {/* CONTENT */}
                        <div className="p-5 flex-1 flex flex-col">
                            {/* TITLE */}
                            <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-800 dark:text-white line-clamp-1">
                                {packages.title}
                            </h3>

                            {/* DESCRIPTION */}
                            <p className="text-sm text-gray-600 dark:text-gray-300 flex-1 line-clamp-3">
                                {packages.about}
                            </p>

                            {/* META INFO */}
                            <div className="mt-4 flex items-center justify-between text-sm text-gray-700 dark:text-gray-300">
                                <span className="flex items-center gap-1">
                                    ⏱ <span>{packages.duration} Days</span>
                                </span>
                                <span className="text-blue-600 dark:text-blue-400 font-semibold">
                                    Best Deal
                                </span>
                            </div>

                            {/* CTA */}
                            <button
                                onClick={() => navigate(`/packages/${packages._id}`)}
                                className="
        mt-5 w-full
        bg-gradient-to-r from-blue-500 to-blue-600
        hover:from-blue-600 hover:to-blue-700
        text-white py-2.5 rounded-lg
        font-semibold tracking-wide
        transition
      "
                            >
                                View Details
                            </button>
                        </div>
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
                                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden flex flex-col h-full p-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <img
                                        src={guide.photoURL || "https://via.placeholder.com/400x300?text=No+Image"}
                                        alt={guide.name}
                                        className="w-full h-48 object-cover rounded-lg"
                                    />
                                    <div className="mt-3">
                                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{guide.name}</h2>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Email: {guide.email}</p>
                                        <button
                                            onClick={() => navigate(`/singleGuide/${guide._id}`)}
                                            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-all duration-300"
                                        >
                                            Details
                                        </button>
                                    </div>
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
