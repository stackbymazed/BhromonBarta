import React from 'react';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { useNavigate } from 'react-router';

const TouristStorySection = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  // Hardcoded sample stories
  const stories = [
    {
      _id: 'story1',
      title: 'My Amazing Trip to Sundarbans',
      author: 'Rana Ahmed',
      summary: 'Explored the dense mangrove forest and saw the Royal Bengal Tiger!',
      url: 'https://yourwebsite.com/stories/story1',
    },
    {
      _id: 'story2',
      title: 'Sunsets at Cox’s Bazar',
      author: 'Laila Hasan',
      summary: 'The longest sea beach left me mesmerized by its beauty and serenity.',
      url: 'https://yourwebsite.com/stories/story2',
    },
    {
      _id: 'story3',
      title: 'Adventure in Sajek Valley',
      author: 'Munna Rahman',
      summary: 'A breathtaking experience with hills, valleys, and local culture.',
      url: 'https://yourwebsite.com/stories/story3',
    },
    {
      _id: 'story4',
      title: 'Historical Dhaka Walk',
      author: 'Farzana Islam',
      summary: 'Walking through old Dhaka was like traveling back in time.',
      url: 'https://yourwebsite.com/stories/story4',
    },
  ];

  const handleShareClick = (e, storyUrl) => {
    if (!isLoggedIn) {
      e.preventDefault();  // Prevent share if not logged in
      navigate('/login');
    }
    // Otherwise, react-share button handles sharing
  };

  return (
    <section className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Tourist Stories</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {stories.map(story => (
          <div key={story._id} className="bg-white p-5 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">{story.title}</h3>
            <p className="text-gray-600 italic mb-2">by {story.author}</p>
            <p className="mb-4">{story.summary}</p>
            <FacebookShareButton
              url={story.url}
              quote={story.title}
              onClick={(e) => handleShareClick(e, story.url)}
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              <FacebookIcon size={32} round />
              <span>Share on Facebook</span>
            </FacebookShareButton>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <button
          onClick={() => navigate('/stories')}
          className="bg-gray-800 text-white px-6 py-3 rounded hover:bg-gray-900"
        >
          All Stories
        </button>
      </div>
    </section>
  );
};

export default TouristStorySection;
