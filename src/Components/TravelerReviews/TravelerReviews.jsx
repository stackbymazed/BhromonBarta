import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar } from "react-icons/fa";
import useAxios from "../../hooks/useAxios";

/* ---------------- STAR RATING COMPONENT ---------------- */
const StarRating = ({ rating, setRating }) => {
  const [hover, setHover] = useState(null);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.span
          key={star}
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaStar
            size={28}
            className={`cursor-pointer transition-colors ${
              (hover || rating) >= star
                ? "text-yellow-400"
                : "text-gray-300"
            }`}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(null)}
          />
        </motion.span>
      ))}
    </div>
  );
};

/* ---------------- MAIN COMPONENT ---------------- */
const TravelerReviews = () => {
  const axiosInstance = useAxios();
  const queryClient = useQueryClient();

  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    rating: 5,
    text: "",
  });

  /* -------- FETCH REVIEWS -------- */
  const {
    data: reviews = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosInstance.get("/reviews");
      return res.data;
    },
  });

  const displayedReviews = reviews.slice(0, 4);

  /* -------- STAR RENDER -------- */
  const renderStars = (count) => {
    return [...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        size={18}
        className={i < count ? "text-yellow-400" : "text-gray-300"}
      />
    ));
  };

  /* -------- SUBMIT REVIEW -------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/reviews", formData);
      setModalOpen(false);
      setFormData({ name: "", rating: 5, text: "" });
      refetch();
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <>
      {/* ---------------- REVIEWS SECTION ---------------- */}
      <section className="max-w-5xl mx-auto p-6 mt-12 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Traveler Reviews & Ratings
        </h2>

        {isLoading && <p className="text-center">Loading reviews...</p>}
        {isError && (
          <p className="text-center text-red-500">Error loading reviews.</p>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {displayedReviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-4 rounded shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-gray-800">{review.name}</p>
                <p className="text-sm text-gray-500">
                  {new Date(review.date).toLocaleDateString()}
                </p>
              </div>

              <div className="flex gap-1 mb-2">
                {renderStars(review.rating)}
              </div>

              <p className="text-gray-700">{review.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setModalOpen(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-full"
          >
            Add Your Review
          </motion.button>
        </div>
      </section>

      {/* ---------------- MODAL ---------------- */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="bg-white rounded-xl p-6 w-full max-w-md mx-4 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold mb-4">
                Submit Your Review
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full border p-2 rounded"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />

                {/* STAR INPUT */}
                <div>
                  <p className="mb-2 font-medium text-gray-700">
                    Your Rating:{" "}
                    <span className="text-yellow-500">
                      {formData.rating}
                    </span>{" "}
                    Star
                  </p>

                  <StarRating
                    rating={formData.rating}
                    setRating={(val) =>
                      setFormData({ ...formData, rating: val })
                    }
                  />
                </div>

                <textarea
                  placeholder="Your Review"
                  className="w-full border p-2 rounded"
                  required
                  value={formData.text}
                  onChange={(e) =>
                    setFormData({ ...formData, text: e.target.value })
                  }
                />

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TravelerReviews;
