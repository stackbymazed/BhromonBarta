// import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import { FacebookShareButton, FacebookIcon } from 'react-share';
// import { useNavigate } from 'react-router';
// import useAxiosSecure from '../../hooks/useAxiosSecure';

// const getAuthorColor = (author) => {
//   const colors = ['bg-blue-100', 'bg-green-100', 'bg-yellow-100', 'bg-pink-100', 'bg-purple-100'];
//   const hash = author.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
//   return colors[hash % colors.length];
// };

// const TouristStorySection = ({ isLoggedIn }) => {
//   const navigate = useNavigate();
//   const axiosUrl = useAxiosSecure()
//   const { data: stories, isLoading, error } = useQuery({
//     queryKey: ['stories'],
//     queryFn: async () => {
//       const res = await axiosUrl.get('/stories');
//       return res.data;
//     },
//   });

//   const handleShareClick = (e, storyUrl) => {
//     if (!isLoggedIn) {
//       e.preventDefault();
//       navigate('/login');
//     }
//   };

//   if (isLoading) return <p className="text-center mt-10">Loading stories...</p>;
//   if (error) return <p className="text-center mt-10 text-red-500">Error loading stories</p>;

//   return (
//     <section className="max-w-6xl mx-auto p-6">
//       <h2 className="text-3xl font-bold mb-8 text-center">Tourist Stories</h2>
//       <div className="grid gap-10 md:grid-cols-2">
//         {stories.map((story, idx) => {
//           const hasImages = story.images && story.images.length > 0;
//           const authorBg = getAuthorColor(story.author);
//           const isEven = idx % 2 === 0;

//           return (
//             <article
//               key={story._id}
//               className={`rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row ${isEven ? '' : 'md:flex-row-reverse'
//                 } bg-white dark:bg-gray-800`}
//             >
//               {hasImages && (
//                 <div className={`flex-shrink-0 ${isEven ? 'md:w-1/2' : 'md:w-1/3'}`}>
//                   <img
//                     src={story.images[0]}
//                     alt={story.title}
//                     className="w-full h-48 md:h-full object-cover"
//                   />
//                 </div>
//               )}

//               <div className="p-6 flex flex-col justify-between md:flex-1">
//                 <header>
//                   <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">{story.title}</h3>
//                   <p className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 text-gray-700 dark:text-gray-300 ${authorBg}`}>
//                     by {story.author}
//                   </p>
//                 </header>

//                 <p className="text-gray-700 dark:text-gray-300 mb-6 line-clamp-4">
//                   {story.description || 'No description available.'}
//                 </p>

//                 <FacebookShareButton
//                   url={`${window.location.origin}/stories/${story._id}`}
//                   quote={story.title}
//                   onClick={(e) => handleShareClick(e, story._id)}
//                   className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 self-start"
//                 >
//                   <FacebookIcon size={32} round />
//                   <span>Share on Facebook</span>
//                 </FacebookShareButton>
//               </div>
//             </article>
//           );
//         })}
//       </div>

//       <div className="mt-10 text-center">
//         <button
//           onClick={() => navigate('/stories')}
//           className="bg-gray-800 text-white px-6 py-3 rounded hover:bg-gray-900"
//         >
//           All Stories
//         </button>
//       </div>
//     </section>
//   );
// };

// export default TouristStorySection;



import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const getAuthorColor = (author) => {
  const colors = ['bg-blue-100', 'bg-green-100', 'bg-yellow-100', 'bg-pink-100', 'bg-purple-100'];
  const hash = author.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
};

const TouristStorySection = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const axiosUrl = useAxiosSecure();

  const [showAll, setShowAll] = useState(false);

  const { data: stories = [], isLoading, error, refetch } = useQuery({
    queryKey: ['stories', showAll ? 'all' : 4],
    queryFn: async () => {
      const limitParam = showAll ? '' : '?limit=4';
      const res = await axiosUrl.get('/stories' + limitParam);
      return res.data;
    },
  });

  const handleShareClick = (e, storyUrl) => {
    if (!isLoggedIn) {
      e.preventDefault();
      navigate('/login');
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading stories...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error loading stories</p>;

  return (
   <section className="max-w-6xl mx-auto p-6">
  <h2 className="text-3xl font-bold mb-10 text-center">Tourist Stories</h2>
  <div className="grid gap-12 md:grid-cols-2">
    {stories.map((story, idx) => {
      const hasImages = story.images && story.images.length > 0;
      const authorBg = getAuthorColor(story.author);
      const isEven = idx % 2 === 0;

      return (
        <article
          key={story._id}
          className={`rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden flex flex-col md:flex-row ${
            isEven ? '' : 'md:flex-row-reverse'
          } bg-white dark:bg-gray-900 transition-shadow duration-300 hover:shadow-2xl`}
        >
          {hasImages && (
            <div className={`flex-shrink-0 ${isEven ? 'md:w-1/2' : 'md:w-1/3'}`}>
              <img
                src={story.images[0]}
                alt={story.title}
                className="w-full h-52 md:h-full object-cover"
              />
            </div>
          )}

          <div className="p-8 flex flex-col justify-between md:flex-1">
            <header>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">{story.title}</h3>
              <p
                className={`inline-block px-4 py-1 rounded-full text-sm font-medium mb-6 text-gray-700 dark:text-gray-300 ${authorBg}`}
              >
                by {story.author}
              </p>
            </header>

            <p className="text-gray-700 dark:text-gray-300 mb-8 line-clamp-4 leading-relaxed">
              {story.description || 'No description available.'}
            </p>

            <FacebookShareButton
              url={`${window.location.origin}/stories/${story._id}`}
              quote={story.title}
              onClick={(e) => handleShareClick(e, story._id)}
              className="inline-flex items-center space-x-3 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 self-start transition-colors duration-300"
            >
              <FacebookIcon size={32} round />
              <span className="font-medium">Share on Facebook</span>
            </FacebookShareButton>
          </div>
        </article>
      );
    })}
  </div>

  {!showAll && (
    <div className="mt-12 text-center">
      <button
        onClick={() => setShowAll(true)}
        className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-900 transition-colors duration-300"
      >
        View All Stories
      </button>
    </div>
  )}
</section>

  );
};

export default TouristStorySection;
