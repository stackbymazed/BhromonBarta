import React from 'react';
import { motion } from 'framer-motion';

import Banner from '../../Components/Banner/Banner';
import Overview from '../../Components/Overview/Overview';
import TravelGuide from '../../Components/TravelGuide/TravelGuide';
import TouristStorySection from '../../Components/TouristStorySection/TouristStorySection';
import TravelerReviews from '../../Components/TravelerReviews/TravelerReviews';
import PopularCuisine from '../../Components/PopularCuisine/PopularCuisine';
import WhyChooseUs from '../../Components/WhyChooseUs/WhyChooseUs';
import Features from '../../Components/features/Features';

const bgVariants = {
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: {
      duration: 25,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

const Home = () => {
  return (
    <motion.div
      className={`
        min-h-screen 
        bg-gradient-to-r 
        from-pink-100 via-yellow-100 to-green-100 
        dark:from-purple-900 dark:via-blue-900 dark:to-black 
        bg-[length:200%_200%]
      `}
      variants={bgVariants}
      animate="animate"
    >
      <Banner />
      <Overview />
      <TravelGuide />
      <TouristStorySection />
      <PopularCuisine />
      <Features />
      <WhyChooseUs />
      <TravelerReviews />
    </motion.div>
  );
};

export default Home;
