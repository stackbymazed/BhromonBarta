import React from "react";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import L from "leaflet";
import "leaflet/dist/leaflet.css";


const markerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});


const backgroundVariants = {
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: {
      duration: 25,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

const position = [22.8167, 91.1];

const projects = [
  {
    title: "Online Group Study",
    description:
      "A collaborative platform for students to join study groups, share notes, and participate in live discussions.",
    github: "https://github.com/stackbymazed/Online-Group-Study-Client",
    live: "https://assignment-11-e732e.web.app/",
  },
  {
    title: "Roommate Finder",
    description:
      "Find compatible roommates based on location, budget, and lifestyle preferences.",
    github: "https://github.com/stackbymazed/Roommate-Finder-Client",
    live: "https://roommate-finder-5dc65.web.app/",
  },
];

const AboutUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message submitted successfully!");
    e.target.reset();
  };

  return (
    <motion.section
      className="min-h-screen p-6 bg-[length:200%_200%] dark:text-white"
      variants={backgroundVariants}
      animate="animate"
    >
      <div className="max-w-6xl mx-auto px-4 space-y-16">

        <section>
          <h2 className="text-3xl font-bold text-center mb-10">
            Meet the Developer
          </h2>

          <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 text-center">
            <img
              src="https://i.ibb.co.com/rRqJFHkR/Whats-App-Image-2025-12-11-at-08-59-16-f3dec7a8.jpg"
              alt="Mazedul Islam"
              className="w-28 h-28 mx-auto rounded-full object-cover border-4 mb-4"
            />
            <h3 className="text-2xl font-semibold">Mazedul Islam</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              MERN Stack Web Developer
            </p>
            <p className="text-sm mt-3 text-gray-500 dark:text-gray-400">
              I specialize in building responsive and scalable web applications
              using MERN, Firebase, and modern UI frameworks. Passionate about
              solving real-world problems with clean code.
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-6 text-center">Projects</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md"
              >
                <h4 className="text-xl font-semibold mb-2">
                  {project.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
                <div className="flex justify-between text-sm">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    GitHub
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline"
                  >
                    Live Demo
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col sm:flex-row gap-6">
          <ContactCard icon={<MdLocationOn />} title="Location" value="Noakhali, Bangladesh" />
          <ContactCard icon={<MdPhone />} title="Phone" value="+8801893679303" />
          <ContactCard icon={<MdEmail />} title="Email" value="majedulislam223311@gmail.com" />
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6 max-w-xl mx-auto"
          >
            <div>
              <p className="italic text-red-500">Have any question?</p>
              <h2 className="text-3xl font-bold">Get in Touch</h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Your name"
                className="input input-bordered w-full"
                required
              />
              <input
                type="email"
                placeholder="Email address"
                className="input input-bordered w-full"
                required
              />
            </div>

            <textarea
              rows={4}
              placeholder="Write your message..."
              className="textarea textarea-bordered w-full"
              required
            />

            <button type="submit" className="btn btn-primary w-full sm:w-auto">
              Submit
            </button>
          </form>

          {/* Map */}
          <div className="rounded-lg overflow-hidden shadow-lg h-[250px] md:h-[350px]">
            <MapContainer
              center={position}
              zoom={13}
              scrollWheelZoom={false}
              className="h-full w-full"
            >
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position} icon={markerIcon}>
                <Popup>Dhaka, Bangladesh</Popup>
              </Marker>
            </MapContainer>
          </div>
        </section>
      </div>
    </motion.section>
  );
};

/* =======================
   Reusable Contact Card
======================= */
const ContactCard = ({ icon, title, value }) => (
  <div className="flex-1 bg-gray-100 dark:bg-gray-800 p-6 rounded shadow text-center">
    <div className="text-red-500 text-4xl mb-3 mx-auto">{icon}</div>
    <h4 className="font-semibold text-lg">{title}</h4>
    <p>{value}</p>
  </div>
);

export default AboutUs;
