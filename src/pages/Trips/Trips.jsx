import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { motion } from 'framer-motion';

const Trips = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: tours = [], isLoading, error } = useQuery({
    queryKey: ['allTours'],
    queryFn: async () => {
      const res = await axiosSecure.get('/packagesAll');
      return res.data;
    }
  });

  const bgVariants = {
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: {
      duration: 25,
      repeat: Infinity,
      ease: "linear",
    },
  },
};
  if (isLoading) return <p className="text-center mt-10"><span className="loading loading-spinner loading-xl"></span></p>;
  if (error) return <p className="text-center text-red-500">Failed to load packages.</p>;

  return (
    <motion.div
        className={`
          min-h-screen 
          bg-gradient-to-r 
          from-pink-100 via-yellow-100 to-green-100 
          dark:from-purple-900 dark:via-blue-900 dark:to-black 
          bg-[length:200%_200%] 
          animate-bg
          dark:text-white
          p-6
        `}
        variants={bgVariants}
        animate="animate"
        style={{ minHeight: '100vh' }}
      >
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-10">Available Tour Packages</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {tours.map((tour) => (
          <div
            key={tour._id}
            className="bg-white dark:bg-gray-900 shadow-lg rounded-xl overflow-hidden flex flex-col"
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
                className="mt-5 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded hover:from-indigo-600 hover:to-purple-600 transition"
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
