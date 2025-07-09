const PopularCuisine = () => {
  const dishes = [
    {
      id: 'dish1',
      name: 'Hilsha Fish Curry',
      image: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Hilsha_Fish_Curry.jpg',
      description: 'The national fish of Bangladesh, cooked with mustard seeds and spices.',
    },
    {
      id: 'dish2',
      name: 'Panta Bhat',
      image: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Panta_bhat_02.jpg',
      description: 'Fermented rice soaked in water, traditionally eaten with fried hilsha or chili.',
    },
    {
      id: 'dish3',
      name: 'Bhuna Khichuri',
      image: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Bhuna_Khichuri.JPG',
      description: 'A fragrant rice and lentil dish cooked with aromatic spices, often enjoyed during festivals.',
    },
    {
      id: 'dish4',
      name: 'Mishti Doi',
      image: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Misti_doi_-_Bangladeshi_sweet_yogurt.jpg',
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
