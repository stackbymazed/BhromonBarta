import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { motion } from 'framer-motion';

const Trips = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState('default');

  const { data: tours = [], isLoading, error } = useQuery({
    queryKey: ['allTours'],
    queryFn: async () => {
      const res = await axiosSecure.get('/packagesAll');
      return res.data;
    }
  });

  const sortedTours = useMemo(() => {
    if (!tours) return [];
    const toursCopy = [...tours];
    switch (sortBy) {
      case 'price-asc':
        return toursCopy.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return toursCopy.sort((a, b) => b.price - a.price);
      case 'duration-asc':
        return toursCopy.sort((a, b) => a.duration - b.duration);
      case 'duration-desc':
        return toursCopy.sort((a, b) => b.duration - a.duration);
      case 'title-asc':
        return toursCopy.sort((a, b) => a.title.localeCompare(b.title));
      case 'title-desc':
        return toursCopy.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return toursCopy;
    }
  }, [tours, sortBy]);

  const bgVariants = {
    animate: {
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      transition: { duration: 25, repeat: Infinity, ease: "linear" },
    },
  };

  if (isLoading) return <p className="text-center mt-10"><span className="loading loading-spinner loading-xl"></span></p>;
  if (error) return <p className="text-center text-red-500">Failed to load packages.</p>;

  return (
    <motion.div
      className="min-h-screen bg-[length:200%_200%] animate-bg dark:text-white p-6"
      variants={bgVariants}
      animate="animate"
      style={{ minHeight: '100vh' }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">Available Tour Packages</h2>

        {/* Sort Card */}
        <div className="mb-8 flex justify-end">
          <div className="flex items-center bg-white dark:bg-gray-800 shadow-md rounded-xl px-4 py-2 gap-4">
            <span className="font-medium text-gray-700 dark:text-gray-200">Sort By:</span>
            <select
              className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="duration-asc">Duration: Short to Long</option>
              <option value="duration-desc">Duration: Long to Short</option>
              <option value="title-asc">Title: A to Z</option>
              <option value="title-desc">Title: Z to A</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedTours.map((tour) => (
            <div
              key={tour._id}
              className="bg-white dark:bg-gray-900 shadow-lg rounded-xl overflow-hidden flex flex-col hover:shadow-xl transition"
            >
              <img
                src={tour.gallery?.[0]}
                alt={tour.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{tour.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 flex-1 line-clamp-3">{tour.about}</p>
                <div className="mt-4">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Price:</strong> ৳{tour.price}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Duration:</strong> {tour.duration} Days
                  </p>
                </div>
                <button
                  onClick={() => navigate(`/packages/${tour._id}`)}
                  className="mt-5 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Trips;
