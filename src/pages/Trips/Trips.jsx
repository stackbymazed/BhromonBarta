import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';

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

  if (isLoading) return <p className="text-center mt-10"><span className="loading loading-spinner loading-xl"></span></p>;
  if (error) return <p className="text-center text-red-500">Failed to load packages.</p>;

  return (
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
                className="mt-5 w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2 rounded hover:from-indigo-600 hover:to-purple-600 transition"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trips;
