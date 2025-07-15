import { motion } from 'framer-motion';

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
    <motion.section
      className="max-w-5xl mx-auto p-6 mt-12"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <motion.h2
        className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
      >
        Popular Local Cuisine
      </motion.h2>

      <motion.div
        className="grid md:grid-cols-4 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {dishes.map((dish) => (
          <motion.div
            key={dish.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: { opacity: 1, scale: 1 },
            }}
            whileHover={{ scale: 1.03 }}
          >
            <motion.img
              src={dish.image}
              alt={dish.name}
              className="w-full h-40 object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{dish.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">{dish.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default PopularCuisine;
