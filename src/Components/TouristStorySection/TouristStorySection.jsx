import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';
import useAxios from '../../hooks/useAxios';

const getAuthorColor = (author) => {
  const colors = ['bg-blue-100', 'bg-green-100', 'bg-yellow-100', 'bg-pink-100', 'bg-purple-100'];
  const hash = author.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
};

const TouristStorySection = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxios();
  const { user } = useContext(AuthContext);

  const { data: stories = [], isLoading, error } = useQuery({
    queryKey: ['stories'],
    queryFn: async () => {
      const res = await axiosSecure.get('/stories?limit=4');
      return res.data;
    },
  });

  if (isLoading)
    return (
      <p className="text-center mt-10">
        <span className="loading loading-spinner loading-xl"></span>
      </p>
    );

  if (error) return <p className="text-center mt-10 text-red-500">Error loading stories</p>;

  return (
    <motion.section
      className="max-w-7xl mx-auto px-6 py-12"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <motion.h2
        className="text-4xl font-extrabold text-center mb-14 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
      >
        Tourist Stories
      </motion.h2>

      <div className="grid gap-12 md:grid-cols-2">
        {stories.map((story, idx) => {
          const hasImages = story.images && story.images.length > 0;
          const authorBg = getAuthorColor(story.author);
          const isEven = idx % 2 === 0;

          return (
            <motion.article
              key={story._id}
              className={`relative overflow-hidden rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700 backdrop-blur-md bg-white/70 dark:bg-gray-800/60 transition-all duration-300 group hover:shadow-2xl flex flex-col md:flex-row ${isEven ? '' : 'md:flex-row-reverse'}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              viewport={{ once: true }}
            >
              {hasImages && (
                <div className="md:w-1/2 overflow-hidden">
                  <motion.img
                    src={story.images[0]}
                    alt={story.title}
                    className="w-full h-60 md:h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    whileHover={{ scale: 1.05 }}
                  />
                </div>
              )}

              <div className="p-8 flex flex-col justify-between md:w-1/2">
                <header>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white transition-colors">
                    {story.title}
                  </h3>
                  <span className={`inline-block px-4 py-1 text-sm font-medium rounded-full mb-6 ${authorBg} text-gray-800 dark:text-white shadow-sm`}>
                    👤 {story.author}
                  </span>
                </header>

                <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed line-clamp-4">
                  {story.description || 'No description available.'}
                </p>

                {user ? (
                  <FacebookShareButton
                    url={`${window.location.origin}/stories/${story._id}`}
                    quote={story.title}
                    className="inline-flex items-center space-x-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-5 py-3 rounded-full hover:from-teal-600 hover:to-emerald-600 transition-all duration-300 shadow-md"
                  >
                    <FacebookIcon size={32} round />
                    <span className="font-semibold">Share on Facebook</span>
                  </FacebookShareButton>
                ) : (
                  <button
                    onClick={() => navigate('/signIn')}
                    className="inline-flex items-center space-x-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-5 py-3 rounded-full hover:from-teal-600 hover:to-emerald-600 transition-all duration-300 shadow-md"
                  >
                    <FacebookIcon size={32} round />
                    <span className="font-semibold">Login to Share</span>
                  </button>
                )}
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* View All Stories Button */}
      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        viewport={{ once: true }}
      >
        <button
          onClick={() => navigate('/allStories')}
          className="text-white bg-gradient-to-r from-gray-800 to-gray-900 px-8 py-3 rounded-full font-medium hover:from-gray-900 hover:to-black transition-all duration-300 shadow-md"
        >
          View All Stories
        </button>
      </motion.div>
    </motion.section>
  );
};

export default TouristStorySection;
