import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';
import { motion } from 'framer-motion';

const getAuthorColor = (author) => {
  const colors = ['bg-teal-100', 'bg-lime-100', 'bg-rose-100', 'bg-sky-100', 'bg-amber-100'];
  const hash = author.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
};

const CommunityPage = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const { data: stories = [], isLoading, error } = useQuery({
    queryKey: ['allStories'],
    queryFn: async () => {
      const res = await axiosSecure.get('/com-stories');
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center mt-10"><span className="loading loading-spinner loading-xl"></span></p>;
  if (error) return <p className="text-center text-red-500 mt-10">Error loading community stories.</p>;

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-6"
    >
      <section className="max-w-7xl mx-auto px-4 pb-5">
        <h2 className="text-4xl font-bold text-center mb-12">Community Stories</h2>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => {
            const authorBg = getAuthorColor(story.author);
            const hasImages = story.images && story.images.length > 0;

            return (
              <article
                key={story._id}
                className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow overflow-hidden flex flex-col h-full"
              >
                {hasImages && (
                  <div className="h-56 md:h-64 w-full overflow-hidden rounded-t-3xl">
                    <img
                      src={story.images[0]}
                      alt={story.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                )}

                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">{story.title}</h3>
                    <p className={`text-sm font-medium mb-4 px-3 py-1 rounded-full inline-block text-gray-800 dark:text-white ${authorBg}`}>
                      by {story.author}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-6 line-clamp-4">{story.description}</p>
                  </div>

                  {user ? (
                    <FacebookShareButton
                      url={`${window.location.origin}/stories/${story._id}`}
                      quote={story.title}
                      className="inline-flex items-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full transition-all duration-300 shadow-md"
                    >
                      <FacebookIcon size={28} round />
                      <span className="font-semibold">Share</span>
                    </FacebookShareButton>
                  ) : (
                    <button
                      onClick={() => navigate('/signIn')}
                      className="inline-flex items-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full transition-all duration-300 shadow-md"
                    >
                      <FacebookIcon size={28} round />
                      <span className="font-semibold">Login to Share</span>
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </motion.div>
  );
};

export default CommunityPage;
