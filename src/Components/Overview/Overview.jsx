import React from 'react';

const Overview = () => {
  return (
    <section className="bg-white py-12 px-4 md:px-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Text Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Explore Your Destination with BhromonBarta
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            BhromonBarta is your ultimate travel companion! We bring the best destinations, real-time community experiences, and guided trip recommendations — all under one roof. Experience Bangladesh like never before.
          </p>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>Real traveler stories and blogs</li>
            <li>Video overviews of breathtaking locations</li>
            <li>Mobile and desktop responsive experience</li>
          </ul>
        </div>

        {/* Video or Image Preview */}
        <div className="w-full">
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/l1EssrLxt7E"
              title="Travel Overview Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
