import React from 'react';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { useNavigate } from 'react-router';

const Community = ({ stories, isLoggedIn }) => {
    const {} = stories
  const navigate = useNavigate();

  // Handle share click: if not logged in, redirect to /login
  const handleShareClick = (e, storyUrl) => {
    if (!isLoggedIn) {
      e.preventDefault();
      navigate('/login');
    }
  };

  return (
    <section className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">Community Stories</h1>

      {stories.length === 0 ? (
        <p className="text-center text-gray-600">No stories have been added yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <div key={story._id} className="bg-white p-5 rounded-lg shadow-md flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">{story.title}</h2>
                <p className="text-gray-600 italic mb-1">by {story.author}</p>
                <p className="mb-4">{story.summary}</p>
              </div>
              <div className="flex justify-between items-center">
                <FacebookShareButton
                  url={story.url}
                  quote={story.title}
                  onClick={(e) => handleShareClick(e, story.url)}
                  className="inline-flex items-center space-x-2 bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700"
                >
                  <FacebookIcon size={28} round />
                  <span className="text-sm">Share</span>
                </FacebookShareButton>
                <button
                  onClick={() => navigate(`/stories/${story._id}`)}
                  className="bg-gray-800 text-white px-4 py-1.5 rounded hover:bg-gray-900 text-sm"
                >
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Community;
