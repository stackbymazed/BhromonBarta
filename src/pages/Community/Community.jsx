import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router';

const getAuthorColor = (author) => {
  const colors = ['bg-teal-100', 'bg-lime-100', 'bg-rose-100', 'bg-sky-100', 'bg-amber-100'];
  const hash = author.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
};

const CommunityPage = ({ isLoggedIn }) => {
  const axiosUrl = useAxiosSecure();
  const navigate = useNavigate();

  const { data: stories = [], isLoading, error } = useQuery({
    queryKey: ['allStories'],
    queryFn: async () => {
      const res = await axiosUrl.get('/com-stories');
      return res.data;
    },
  });

  console.log(stories)
  const handleShareClick = (e, storyId) => {
    if (!isLoggedIn) {
      e.preventDefault();
      navigate('/login');
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading stories...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">Error loading community stories.</p>;

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 mt-8">
      <h2 className="text-4xl font-bold text-center mb-12">Community Stories</h2>

      <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {stories.map((story, index) => {
          const authorBg = getAuthorColor(story.author);
          const hasImages = story.images && story.images.length > 0;

          return (
            <article
              key={story._id}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden flex flex-col md:flex-row"
            >
              {hasImages && (
                <img
                  src={story.images[0]}
                  alt={story.title}
                  className="md:w-1/3 h-52 md:h-auto object-cover"
                />
              )}

              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">{story.title}</h3>
                  <p className={`text-sm font-medium mb-4 px-3 py-1 rounded-full inline-block text-gray-800 dark:text-gray-200 ${authorBg}`}>
                    by {story.author}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-6 line-clamp-4">{story.description}</p>
                </div>

                <FacebookShareButton
                  url={`${window.location.origin}/stories/${story._id}`}
                  quote={story.title}
                  onClick={(e) => handleShareClick(e, story._id)}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-5 py-2 rounded-full hover:from-teal-600 hover:to-emerald-600 transition-colors duration-300 shadow"
                >
                  <FacebookIcon size={28} round />
                  <span className="text-sm font-semibold">Share on Facebook</span>
                </FacebookShareButton>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default CommunityPage;
