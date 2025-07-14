import React, { useEffect, useState } from "react";
import axios from "axios";
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
        // Fetch random 3 packages
        axiosSecure.get("/packages")
            .then(res => setPackages(res.data))
            .catch(err => console.error(err));

        // Fetch random 6 tour guides
        axiosSecure.get("/tour-guides")
            .then(res => setGuides(res.data))
            .catch(err => console.error(err));
    }, [axiosSecure]);

    return (
        <div className="px-4 py-10 max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white">
                Tourism and Travel Guide - Bangladesh
            </h1>

            <Tabs>
                <TabList className="flex border-b-2 border-blue-500 rounded-t-lg overflow-hidden text-base font-semibold mb-6 bg-gray-50 dark:bg-gray-900">
                    <Tab className="py-3 px-6 cursor-pointer transition-all duration-300 text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900"
                        selectedClassName="bg-blue-500 text-white shadow-md border-b-0">
                        Our Packages
                    </Tab>
                    <Tab className="py-3 px-6 cursor-pointer transition-all duration-300 text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900"
                        selectedClassName="bg-blue-500 text-white shadow-md border-b-0">
                        Meet Our Tour Guides
                    </Tab>
                </TabList>

                {/* Packages */}
                <TabPanel>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {packages.map(pkg => (
                            <div key={pkg._id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden flex flex-col h-full">
                                <img
                                    src={pkg?.gallery?.[0] || "https://via.placeholder.com/400x300?text=No+Image"}
                                    alt={pkg.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-5 flex flex-col flex-1">
                                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">{pkg.title}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Type: {pkg.status}</p>
                                    <p className="text-green-600 dark:text-green-400 font-medium mb-4">৳ {pkg.price}</p>
                                    <div className="flex-grow" />
                                    <button
                                        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-all duration-300"
                                        onClick={() => navigate(`/packages/${pkg._id}`)}
                                    >
                                        View Package
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </TabPanel>

                {/* Tour Guides */}
                <TabPanel>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                        {guides.length === 0 ? (
                            <div className="text-center text-gray-400 dark:text-gray-500 italic col-span-3">
                                No tour guides found.
                            </div>
                        ) : (
                            guides.map(guide => (
                                <div key={guide._id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden flex flex-col h-full p-4">
                                    <img
                                        src={guide.photoURL || "https://via.placeholder.com/400x300?text=No+Image"}
                                        alt={guide.name}
                                        className="w-full h-48 object-cover rounded-lg"
                                    />
                                    <div className="mt-3">
                                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{guide.name}</h2>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Email: {guide.email}</p>
                                        <button
                                            onClick={() => navigate(`/guides/${guide._id}`)}
                                            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-all duration-300"
                                        >
                                            Details
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default TravelGuide;
