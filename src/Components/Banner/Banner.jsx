import Slider from "react-slick";
import { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

import image1 from '../../assets/Saint.jpg';
import image2 from '../../assets/cox.jpg';
import image3 from '../../assets/Sajek_Valley.jpg';
import image4 from '../../assets/melah.jpg';

const Banner = () => {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  const handleNext = () => sliderRef.current.slickNext();
  const handlePrev = () => sliderRef.current.slickPrev();

  return (
    <div className="relative">
      {/* Custom Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/40 hover:bg-white/60 p-2 rounded-full shadow-md"
      >
        <FaArrowLeft size={20} />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/40 hover:bg-white/60 p-2 rounded-full shadow-md"
      >
        <FaArrowRight size={20} />
      </button>

      <Slider ref={sliderRef} {...settings}>
        {[image1, image2, image3, image4].map((bg, i) => (
          <div key={i}>
            <div
              className="w-full lg:h-[90vh] h-[50vh] bg-cover bg-center flex items-center justify-center text-center relative"
              style={{ backgroundImage: `url(${bg})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50"></div>

              {/* Motion Content */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="relative z-10 px-4 md:px-8 max-w-3xl text-white"
              >
                <motion.h1
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-4xl md:text-6xl font-bold mb-4"
                >
                  Discover the Beauty of Nature
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="text-lg md:text-xl mb-6"
                >
                  Explore amazing places in Bangladesh with us
                </motion.p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition"
                >
                  Get Started
                </motion.button>
              </motion.div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
