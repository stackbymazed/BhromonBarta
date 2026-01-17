import Slider from "react-slick";
import { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router";

const banners = [
  "/images/hero/saint.webp",
  "/images/hero/cox.webp",
  "/images/hero/sajek.webp",
  "/images/hero/melah.webp",
];


const Banner = () => {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    fade: true, // smooth fade between slides
  };

  const handleNext = () => sliderRef.current.slickNext();
  const handlePrev = () => sliderRef.current.slickPrev();

  return (
    <div className="relative w-full overflow-hidden">
      {/* Custom Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/40 hover:bg-white/60 p-3 rounded-full shadow-lg transition"
      >
        <FaArrowLeft size={20} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/40 hover:bg-white/60 p-3 rounded-full shadow-lg transition"
      >
        <FaArrowRight size={20} />
      </button>

      <Slider ref={sliderRef} {...settings}>
        {banners.map((bg, i) => (
          <div
            key={i}
            className="relative w-full h-[50vh] sm:h-[60vh] md:h-[75vh] lg:h-[90vh]"
          >
            {/* Background Image */}
            <img
              src={bg}
              alt="Travel destination"
              className="absolute inset-0 w-full h-full object-cover"
              fetchpriority={i === 0 ? "high" : "auto"} // first slide priority
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/25"></div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4 md:px-8"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4"
              >
                Discover the Beauty of Nature
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-md sm:text-lg md:text-xl text-white mb-6"
              >
                Explore amazing places in Bangladesh with us
              </motion.p>

              <Link
                to="/trips"
                className="bg-primary text-white px-6 py-3 rounded-full shadow-lg"
              >
                Get Started
              </Link>
            </motion.div>
          </div>
        ))}
      </Slider>

    </div>
  );
};

export default Banner;
