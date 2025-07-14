import React from "react";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const AboutUS = () => {
  const position = [22.8167, 91.1000]; // Noakhali coordinates

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 ">
      {/* Developer Info */}
      <div className="">
        <h2 className="text-3xl font-bold text-center mb-10">Meet the Developer</h2>

        {/* Profile Card */}
        <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 text-center">
          <img
            src="https://i.ibb.co/998jGgWD/Air-Brush-20240201194436-2.jpg"
            alt="Majedul Islam"
            className="w-28 h-28 mx-auto rounded-full object-cover border-4 border-red-500 mb-4"
          />
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Majedul Islam
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Full-Stack Web Developer
          </p>
          <p className="text-sm mt-3 text-gray-500 dark:text-gray-400">
            I build responsive and dynamic web applications using the MERN stack,
            Firebase, and modern UI libraries. Passionate about solving real-world
            problems through code.
          </p>
        </div>

        {/* Project Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Project 1 */}
          <div className="bg-white dark:bg-gray-900 p-5 rounded-xl shadow-md">
            <h4 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
              Travel Explorer
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              A travel booking platform featuring destinations, packages, and user
              reviews.
            </p>
            <div className="flex justify-between text-sm">
              <a
                href="https://github.com/majedul/travel-explorer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                GitHub
              </a>
              <a
                href="https://travel-explorer.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:underline"
              >
                Live Demo
              </a>
            </div>
          </div>

          {/* Project 2 */}
          <div className="bg-white dark:bg-gray-900 p-5 rounded-xl shadow-md">
            <h4 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
              Food Gallery
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              A recipe-sharing and food review platform with authentication and admin
              panel.
            </p>
            <div className="flex justify-between text-sm">
              <a
                href="https://github.com/majedul/food-gallery"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                GitHub
              </a>
              <a
                href="https://food-gallery.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:underline"
              >
                Live Demo
              </a>
            </div>
          </div>

          {/* Project 3 */}
          <div className="bg-white dark:bg-gray-900 p-5 rounded-xl shadow-md">
            <h4 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
              E-commerce Store
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Fully functional e-commerce site with cart, payments, and dashboard
              features.
            </p>
            <div className="flex justify-between text-sm">
              <a
                href="https://github.com/majedul/ecommerce-store"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                GitHub
              </a>
              <a
                href="https://ecommerce-store.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:underline"
              >
                Live Demo
              </a>
            </div>
          </div>
        </div>

        <p className="text-center mt-10 text-sm text-gray-500 dark:text-gray-400 mb-5">
          Want to collaborate or learn more? Feel free to reach out through the
          contact form above!
        </p>
      </div>
      {/* Contact Cards */}
      <div className="flex flex-col sm:flex-row justify-between gap-6 mb-10">
        <div className="flex-1 bg-gray-100 dark:bg-gray-800 p-6 rounded shadow text-center">
          <MdLocationOn className="mx-auto text-red-500 mb-3 text-4xl" />
          <h4 className="font-semibold mb-1 text-lg">Location</h4>
          <p>Noakhali, Bangladesh</p>
        </div>
        <div className="flex-1 bg-gray-100 dark:bg-gray-800 p-6 rounded shadow text-center">
          <MdPhone className="mx-auto text-red-500 mb-3 text-4xl" />
          <h4 className="font-semibold mb-1 text-lg">Phone</h4>
          <p>+0881893679303</p>
        </div>
        <div className="flex-1 bg-gray-100 dark:bg-gray-800 p-6 rounded shadow text-center">
          <MdEmail className="mx-auto text-red-500 mb-3 text-4xl" />
          <h4 className="font-semibold mb-1 text-lg">Email</h4>
          <p>majedulislam223311@gmail.com</p>
        </div>
      </div>
      {/* Form and Map - responsive with form first */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Form */}
        <form className="order-1 space-y-6 max-w-xl mx-auto">
          <div>
            <p className="italic text-red-500 mb-1">Have any question?</p>
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
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
            placeholder="Write something..."
            className="textarea textarea-bordered w-full"
            rows={4}
            required
          ></textarea>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>

        {/* Map */}
        <div className="order-2 w-full z-0 rounded-lg overflow-hidden shadow-lg h-[200px] lg:h-[350px]">
          <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={icon}>
              <Popup>Noakhali, Bangladesh</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>


    </div>
  );
};

export default AboutUS;
