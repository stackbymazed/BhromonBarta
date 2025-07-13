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
    <div className="max-w-6xl mx-auto px-4 py-10 mt-16">
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
          <p>+08801893679303</p>
        </div>

        <div className="flex-1 bg-gray-100 dark:bg-gray-800 p-6 rounded shadow text-center">
          <MdEmail className="mx-auto text-red-500 mb-3 text-4xl" />
          <h4 className="font-semibold mb-1 text-lg">Email</h4>
          <p>majedulislam223311@gmail.com</p>
        </div>
      </div>

      {/* Form and Map side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Contact Form */}
        <form className="flex-1 space-y-6 max-w-xl">
          {/* Heading */}
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
        <div className="flex-1 w-full z-0 rounded-lg overflow-hidden shadow-lg h-[300px] lg:h-[400px]">
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
