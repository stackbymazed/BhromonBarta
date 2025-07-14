import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const GuideDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: guide, isLoading, error } = useQuery({
    queryKey: ['guide', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/guide/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading) return <div className="text-center mt-10">Loading guide profile...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">Failed to load guide profile.</div>;
  if (!guide) return <div className="text-center mt-10">Guide not found.</div>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 bg-white dark:bg-gray-900 rounded-lg shadow-lg text-center my-20">
      <img
        src={guide.photoURL}
        alt={guide.name}
        className="w-40 h-40 mx-auto rounded-full object-cover border-4 border-blue-500 shadow-md mb-6"
      />
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{guide.name}</h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-1"><strong>Email:</strong> {guide.email}</p>
      <p className="text-lg text-gray-600 dark:text-gray-300"><strong>Role:</strong> {guide.role}</p>
    </div>
  );
};

export default GuideDetails;
