const PopularCuisine = () => {
  const dishes = [
    {
      id: 'dish1',
      name: 'Hilsha Fish Curry',
      image: 'https://nijhoom.b-cdn.net/wp-content/uploads/2023/04/bangladeshi-food-cover-768x403-o.jpg',
      description: 'The national fish of Bangladesh, cooked with mustard seeds and spices.',
    },
    {
      id: 'dish2',
      name: 'Panta Bhat',
      image: 'https://i.ibb.co/Ps27rxx7/Panta-Ilish.jpg',
      description: 'Fermented rice soaked in water, traditionally eaten with fried hilsha or chili.',
    },
    {
      id: 'dish3',
      name: 'Bhuna Khichuri',
      image: 'https://i.ibb.co/6JPYwS2v/Murgir-Bhuna-Khichuri.jpg',
      description: 'A fragrant rice and lentil dish cooked with aromatic spices, often enjoyed during festivals.',
    },
    {
      id: 'dish4',
      name: 'Mishti Doi',
      image: 'https://i.ibb.co/rRyGMB1F/images.webp',
      description: 'Sweetened fermented yogurt dessert, a favorite Bengali delicacy.',
    },
  ];

  return (
    <section className="max-w-5xl mx-auto p-6 mt-12">
      <h2 className="text-3xl font-bold mb-6 text-center">Popular Local Cuisine</h2>
      <div className="grid md:grid-cols-4 gap-6">
        {dishes.map((dish) => (
          <div key={dish.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={dish.image} alt={dish.name} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{dish.name}</h3>
              <p className="text-gray-600 mt-2">{dish.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularCuisine;
