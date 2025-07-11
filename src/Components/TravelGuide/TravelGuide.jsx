import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useNavigate } from 'react-router';
import useAxiosSecure from "../../hooks/useAxiosSecure";

const TravelGuide = () => {
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure()

    const [packages, setPackages] = useState([]);
    // const [guides, setGuides] = useState([]);

    useEffect(() => {
        axiosSecure.get("/packages")
            .then(res => setPackages(res.data))
            .catch(err => console.error(err));

        // axiosSecure.get("/guides")
        //     .then(res => setGuides(res.data))
        //     .catch(err => console.error(err));
    }, [axiosSecure]);

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">Tourism and Travel Guide - Bangladesh</h1>
            <Tabs>
                <TabList className="text-lg font-semibold">
                    <Tab>Our Packages</Tab>
                    <Tab>Meet Our Tour Guides</Tab>
                </TabList>

                {/* Our Packages */}
                <TabPanel>
                    <div className="grid md:grid-cols-3 gap-6 mt-6">
                        {packages.map(pkg => (
                            <div key={pkg._id} className="bg-white rounded-2xl shadow-md overflow-hidden">
                                <img src={pkg.image} alt={pkg.title} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h3 className="text-xl font-bold">{pkg.title}</h3>
                                    <p className="text-gray-500">Type: {pkg.tourType}</p>
                                    <p className="text-green-600 font-semibold">৳ {pkg.price}</p>
                                    <button
                                        className="mt-3 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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
                    <div className="grid md:grid-cols-3 gap-6 mt-6">
                        sdfadsf
                        {/* {sampleGuides.map(guide => (
                            <div key={guide._id} className="bg-white rounded-2xl shadow-md overflow-hidden">
                                <img src={guide.photo} alt={guide.name} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h3 className="text-xl font-bold">{guide.name}</h3>
                                    <p className="text-gray-500">{guide.experience} years experience</p>
                                    <p className="text-gray-500">Language: {guide.language}</p>
                                    <button
                                        className="mt-3 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                        onClick={() => navigate(`/guides/${guide._id}`)}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))} */}
                    </div>
                </TabPanel>
            </Tabs>
        </div>

    );
};

export default TravelGuide;
