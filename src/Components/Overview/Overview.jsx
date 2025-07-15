import React from 'react';
import { motion } from 'framer-motion';

const Overview = () => {
  return (
    <section className="dark:text-white dark:bg-gray-900 py-16 px-4 md:px-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
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
        </motion.div>

        {/* Image Grid */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4"
        >
          {[
            "https://i.ibb.co/d0mms3pK/coxsjpg.jpg",
            "https://i.ibb.co/vCRj4w76/mela.jpg",
            "https://i.ibb.co/dsKN3J9y/Saint.jpg",
            "https://i.ibb.co/WLpfDp6/Sajek-Valley.jpg",
          ].map((img, index) => (
            <motion.img
              key={index}
              src={img}
              alt={`img-${index}`}
              className="rounded-lg object-cover h-40 w-full shadow-md"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Overview;
