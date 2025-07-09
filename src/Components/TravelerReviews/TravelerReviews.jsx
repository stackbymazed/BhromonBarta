const TravelerReviews = () => {
  // Hardcoded sample reviews for now
  const reviews = [
    {
      id: 'rev1',
      name: 'Tahsin Ahmed',
      date: '2024-06-20',
      rating: 5,
      text: 'Amazing experience in Cox’s Bazar! The guide was super helpful and friendly.',
    },
    {
      id: 'rev2',
      name: 'Shamima Begum',
      date: '2024-06-18',
      rating: 4,
      text: 'Sundarbans tour was breathtaking. Would love to go again!',
    },
    {
      id: 'rev3',
      name: 'Rafiq Chowdhury',
      date: '2024-06-15',
      rating: 5,
      text: 'Sajek Valley was peaceful and scenic. Highly recommend this package.',
    },
  ];

  // Simple stars display
  const renderStars = (count) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={i < count ? 'text-yellow-400' : 'text-gray-300'}>
        ★
      </span>
    ));
  };

  return (
    <section className="max-w-5xl mx-auto p-6 mt-12 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center">Traveler Reviews & Ratings</h2>
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-4 rounded shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <p className="font-semibold">{review.name}</p>
              <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
            </div>
            <div className="mb-2">{renderStars(review.rating)}</div>
            <p className="text-gray-700">{review.text}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <button
          onClick={() => alert('Redirect to Add Review page')}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          Add Your Review
        </button>
      </div>
    </section>
  );
};

export default TravelerReviews;
