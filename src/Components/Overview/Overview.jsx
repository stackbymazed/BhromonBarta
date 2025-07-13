import React from 'react';

const Overview = () => {
  return (
    <section className="bg-white dark:bg-gray-900 py-16 px-4 md:px-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">

        {/* Text Content */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
            Explore Your Destination with BhromonBarta
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Experience stunning locations, real traveler stories, and helpful insights — all curated to help you plan your next adventure across Bangladesh.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Adventure-ready destinations</li>
            <li>Visual experience through image previews</li>
            <li>Optimized for all devices</li>
          </ul>
        </div>

        {/* Image Grid Instead of Video */}
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://i.ibb.co/d0mms3pK/coxsjpg.jpg"
            alt="Nature spot"
            className="rounded-lg object-cover h-40 w-full shadow-md"
          />
          <img
            src="https://i.ibb.co/vCRj4w76/mela.jpg"
            alt="Trekking"
            className="rounded-lg object-cover h-40 w-full shadow-md"
          />
          <img
            src="https://i.ibb.co/dsKN3J9y/Saint.jpg"
            alt="Camping"
            className="rounded-lg object-cover h-40 w-full shadow-md"
          />
          <img
            src="https://i.ibb.co/WLpfDp6/Sajek-Valley.jpg"
            alt="Beach"
            className="rounded-lg object-cover h-40 w-full shadow-md"
          />
        </div>
      </div>
    </section>
  );
};

export default Overview;
