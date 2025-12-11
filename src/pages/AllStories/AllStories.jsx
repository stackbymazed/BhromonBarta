import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router';

const AllStories = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: stories = [], isLoading, error } = useQuery({
    queryKey: ['allStories'],
    queryFn: async () => {
      const res = await axiosSecure.get('/stories');
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center mt-10"><div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-600"></div></div>;
  if (error) return <div className="text-center mt-10 text-red-500">Error loading stories.</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 mt-10">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
        All Tourist Stories
      </h1>

      <div className="grid md:grid-cols-2 gap-10">
        {stories.map((story) => (
          <div
            key={story._id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            {story.images && story.images.length > 0 && (
              <img
                src={story.images[0]}
                alt={story.title}
                className="w-full h-64 object-cover"
              />
            )}

            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
                {story.title}
              </h2>
              <p className="text-sm text-gray-500 mb-4">By: {story.author}</p>
              <p className="text-gray-700 dark:text-gray-300 mb-6 line-clamp-4">
                {story.description || 'No description available.'}
              </p>

              <button
                onClick={() => navigate(`/story/${story._id}`)}
                className="mt-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-all duration-200"
              >
                Read Full Story
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllStories;
