import Slider from "react-slick";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router";

const banners = [
  {
    image: "/images/hero/twopeople.webp",
    title: "Find your perfect",
    main: "VACATION",
    subtitle: "Italy, Rome, Venice, Milan",
  },
  {
    image: "/images/hero/canalhouse.webp",
    title: "Open your eyes to",
    main: "THE HIDDEN WORLD",
    subtitle: "Bern, Lucern, Zurich, Zermatt",
  },
  {
    image: "/images/hero/cox.webp",
    title: "Special",
    main: "7 Days in Cox's Bazar",
    subtitle: "Bern, Lucern, Jungfrau, Matterhorn",
  },
];

const Banner = () => {
  const sliderRef = useRef(null);
  const [active, setActive] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    fade: true,
    autoplay: true,
    autoplaySpeed: 6500,
    speed: 1200,
    arrows: false,
    beforeChange: (_, next) => setActive(next),
  };

  return (
    <div className="relative w-full">
      {/* ⬅️ LEFT ARROW */}
      <button
        onClick={() => sliderRef.current?.slickPrev()}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30
        bg-white/30 hover:bg-white/50 p-3 rounded-full transition"
      >
        <FaChevronLeft className="text-white" />
      </button>

      {/* ➡️ RIGHT ARROW */}
      <button
        onClick={() => sliderRef.current?.slickNext()}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30
        bg-white/30 hover:bg-white/50 p-3 rounded-full transition"
      >
        <FaChevronRight className="text-white" />
      </button>

      <Slider ref={sliderRef} {...settings}>
        {banners.map((item, i) => (
          <div
            key={i}
            className="relative min-h-[100svh] overflow-hidden"
          >
            {/* 🌈 FALLBACK GRADIENT */}
            <div className="absolute inset-0 bg-gradient-to-r from-sky-900 via-emerald-900 to-teal-800" />

            {/* 🎥 IMAGE – CENTER ZOOM OUT */}
            <motion.img
              src={item.image}
              alt={item.main}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 12, ease: "linear" }}
              style={{ transformOrigin: "50% 50%" }}
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/40" />

            {/* CONTENT */}
            <div
              className="relative z-20 min-h-[100svh] flex items-center
              px-4 sm:px-6 md:px-12 lg:px-24 text-white"
            >
              <AnimatePresence mode="wait">
                {active === i && (
                  <div key={i} className="max-w-2xl">

                    {/* TITLE */}
                    <motion.p
                      initial={{ opacity: 0, x: -40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6 }}
                      className="
                        uppercase tracking-widest mb-3 text-white/80
                        text-xs sm:text-sm md:text-base lg:text-3xl
                      "
                    >
                      {item.title}
                    </motion.p>

                    {/* MAIN HEADING */}
                    <motion.h1
                      initial={{ opacity: 0, x: 80 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.9 }}
                      className="
                        font-extrabold mb-4
                        text-3xl sm:text-4xl md:text-5xl
                        lg:text-6xl xl:text-7xl
                      "
                    >
                      {item.main}
                    </motion.h1>

                    {/* SUBTITLE – LETTER ANIMATION */}
                    <motion.p
                      className="
                        mb-8 flex flex-wrap text-white/90
                        text-sm sm:text-base md:text-lg lg:text-xl
                      "
                    >
                      {item.subtitle.split("").map((char, idx) => (
                        <motion.span
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.025 }}
                        >
                          {char === " " ? "\u00A0" : char}
                        </motion.span>
                      ))}
                    </motion.p>

                    {/* BUTTON */}
                    <motion.div
                      initial={{ scaleX: 0, originX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.6 }}
                      className="inline-block"
                    >
                      <Link
                        to="/trips"
                        className="
                          inline-block bg-blue-500 hover:bg-blue-600
                          rounded-md font-semibold transition
                          px-5 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3
                          text-sm sm:text-base
                        "
                      >
                        LEARN MORE
                      </Link>
                    </motion.div>

                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
