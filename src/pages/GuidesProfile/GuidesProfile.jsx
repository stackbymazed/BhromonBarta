import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { motion } from 'framer-motion';

const GuidesProfile = () => {
  const axiosSecure = useAxiosSecure();

  const { data: guides = [], isLoading: loadingGuides } = useQuery({
    queryKey: ['guides'],
    queryFn: async () => {
      const res = await axiosSecure.get('/guides-user');
      return res.data;
    },
  });

  const { data: stories = [], isLoading: loadingStories } = useQuery({
    queryKey: ['stories'],
    queryFn: async () => {
      const res = await axiosSecure.get('/stories-guide');
      return res.data;
    },
  });

  if (loadingGuides || loadingStories)
    return <p className="p-4 flex justify-center items-center"><span className="loading loading-spinner loading-xl"></span></p>;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Intro Section */}
      <div className="max-w-4xl mx-auto mb-16 text-center px-4 sm:px-0">
        <h2 className="text-xl uppercase tracking-widest text-blue-600 dark:text-blue-400 font-semibold mb-3">
          Why Choose Our Guides?
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
          Our tour guides are passionate experts with deep local knowledge, ensuring unforgettable adventures.
        </p>
      </div>

      {/* Title Section */}
      <div className="text-center mb-12 px-4 sm:px-0">
        <h1 className="text-5xl font-extrabold text-blue-700 dark:text-blue-400 drop-shadow-lg">
          Meet Our Expert Tour Guides
        </h1>
        <p className="mt-4 text-lg max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
          Explore stories shared by our experienced tour guides. Each guide brings unique journeys and local insights.
        </p>
      </div>

      {/* Guides Cards */}
      <div className="p-6 space-y-12 max-w-7xl mx-auto">
        {guides.map((guide) => {
          const guideStories = stories.filter((story) => story.email === guide.email);

          return (
            <div
              key={guide.id}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 transition-shadow hover:shadow-2xl"
            >
              <div className="mb-6">
                <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">{guide.name}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">{guide.email}</p>
              </div>

              <h3 className="text-xl font-medium mb-6 text-blue-600 dark:text-blue-400">
                Stories by {guide.name}:
              </h3>

              {guideStories.length > 0 ? (
                <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-4">
                  {guideStories.map((story) => (
                    <motion.div
                      className="bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-lg flex flex-col transition min-h-[300px] max-h-[380px] overflow-hidden"
                    >
                      <div className="p-4 flex-1 flex flex-col">
                        <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                          {story.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 mb-2 overflow-hidden line-clamp-3 flex-1">
                          {story.description || 'No description provided.'}
                        </p>
                        <div className="text-xs text-gray-400 dark:text-gray-500 mb-2">
                          <span>By {story.author || 'Unknown author'}</span> |{' '}
                          <time dateTime={story.date}>{formatDate(story.date)}</time>
                        </div>

                        {/* Story Image */}
                        {story.images && story.images.length > 0 && (
                          <img
                            src={story.images[0]}
                            alt={`${story.title} image`}
                            className="w-full h-24 object-cover rounded-xl mt-auto"
                          />
                        )}
                      </div>
                    </motion.div>

                  ))}
                </div>
              ) : (
                <p className="text-gray-400 italic">No stories found for this guide.</p>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default GuidesProfile;
