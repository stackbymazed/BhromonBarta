import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxios from "../../hooks/useAxios";

const TravelerReviews = () => {
  const axiosInstance = useAxios();
  const queryClient = useQueryClient();

  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", rating: 5, text: "" });

  // Fetch reviews using new v5 object syntax
  const { data: reviews = [], isLoading, isError,refetch } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosInstance.get("/reviews");
      return res.data;
    },
  });

  // Show only first 4 reviews
  const displayedReviews = reviews.slice(0, 4);

  const renderStars = (count) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={i < count ? "text-yellow-400" : "text-gray-300"}>
        ★
      </span>
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/reviews", formData);
      setModalOpen(false);
      setFormData({ name: "", rating: 5, text: "" });
      refetch()
      queryClient.invalidateQueries({ queryKey: ["reviews"] }); 
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <>
      <section className="max-w-5xl mx-auto p-6 mt-12 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Traveler Reviews & Ratings</h2>

        {isLoading && <p className="text-center">Loading reviews...</p>}
        {isError && <p className="text-center text-red-500">Error loading reviews.</p>}

        <div className="grid md:grid-cols-2 gap-6">
          {displayedReviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="bg-white p-4 rounded shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-gray-800">{review.name}</p>
                <p className="text-sm text-gray-500">
                  {new Date(review.date).toLocaleDateString()}
                </p>
              </div>
              <div className="mb-2">{renderStars(review.rating)}</div>
              <p className="text-gray-700">{review.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => setModalOpen(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
          >
            Add Your Review
          </button>
        </div>
      </section>

      {modalOpen && (
        <div
          className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg p-6 w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold mb-4">Submit Your Review</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border p-2 rounded"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <select
                className="w-full border p-2 rounded"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
              >
                {[5, 4, 3, 2, 1].map((val) => (
                  <option key={val} value={val}>
                    {val} Star{val > 1 && "s"}
                  </option>
                ))}
              </select>
              <textarea
                placeholder="Your Review"
                className="w-full border p-2 rounded"
                required
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              ></textarea>

              <div className="flex justify-end space-x-2">
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
          </div>
        </div>
      )}
    </>
  );
};

export default TravelerReviews;
