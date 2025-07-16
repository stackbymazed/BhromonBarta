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

  const bgVariants = {
    animate: {
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      transition: {
        duration: 25,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  };

  if (loadingGuides || loadingStories) return <p className="p-4"><span className="loading loading-spinner loading-xl"></span></p>;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <motion.div
      className="
        min-h-screen 
        bg-gradient-to-r 
        from-pink-100 via-yellow-100 to-green-100 
        dark:from-purple-900 dark:via-blue-900 dark:to-black 
        bg-[length:200%_200%] 
        animate-bg
        dark:text-white
        p-6
      "
      variants={bgVariants}
      animate="animate"
      style={{ minHeight: '100vh' }}
    >
      <div className="max-w-4xl mx-auto mb-16 px-4 sm:px-0 text-center">
        <h2 className="text-xl uppercase tracking-widest text-blue-500 font-semibold mb-3">
          Why Choose Our Guides?
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
          Our tour guides are passionate experts with deep local knowledge, ensuring unforgettable adventures. They’re trusted storytellers who bring history, culture, and hidden gems to life — making every journey unique and meaningful.
        </p>
        <blockquote className="mt-8 italic text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
          &ldquo;Travel isn’t just about places, it’s about the stories and connections that guides help you discover.&rdquo;
        </blockquote>
      </div>

      <div className="text-center mb-12 px-4 sm:px-0">
        <h1 className="text-5xl font-extrabold text-blue-700 dark:text-blue-400 drop-shadow-lg">
          Meet Our Expert Tour Guides
        </h1>
        <p className="mt-4 text-lg max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
          Explore the amazing stories shared by our experienced tour guides. Each guide brings unique journeys, local insights, and unforgettable adventures.
        </p>
      </div>

      <div className="p-6 space-y-8 max-w-7xl mx-auto">
        {guides.map((guide) => {
          const guideStories = stories.filter((story) => story.email === guide.email);

          return (
            <div
              key={guide.id}
              className="border border-gray-200 p-6 rounded-2xl shadow-md bg-white dark:bg-gray-800 transition-shadow hover:shadow-lg"
            >
              <div className="mb-6">
                <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">{guide.name}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">{guide.email}</p>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-6 text-blue-600 dark:text-blue-400">
                  Stories by {guide.name}:
                </h3>

                {guideStories.length > 0 ? (
                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {guideStories.map((story) => (
                      <motion.div
                        key={story._id}
                        className="p-5 border rounded-2xl bg-gray-50 dark:bg-gray-900 shadow-sm hover:shadow-lg transition-shadow flex flex-col"
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <h4 className="font-semibold text-xl text-gray-700 dark:text-gray-200 mb-2">
                          {story.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-4">
                          {story.description || 'No description provided.'}
                        </p>
                        <div className="mb-4 text-xs text-gray-400 dark:text-gray-500">
                          <span>By {story.author || 'Unknown author'}</span> |{' '}
                          <time dateTime={story.date}>{formatDate(story.date)}</time>
                        </div>

                        {/* Images */}
                        {story.images && story.images.length > 1 ? (
                          <Swiper spaceBetween={10} slidesPerView={1} className="rounded-xl overflow-hidden">
                            {story.images.map((imgUrl, idx) => (
                              <SwiperSlide key={idx}>
                                <img
                                  src={imgUrl}
                                  alt={`${story.title} image ${idx + 1}`}
                                  className="w-full h-48 object-cover rounded-xl"
                                />
                              </SwiperSlide>
                            ))}
                          </Swiper>
                        ) : story.images && story.images.length === 1 ? (
                          <img
                            src={story.images[0]}
                            alt={`${story.title} image`}
                            className="w-full h-48 object-cover rounded-xl"
                          />
                        ) : null}
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 italic">No stories found for this guide.</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default GuidesProfile;
