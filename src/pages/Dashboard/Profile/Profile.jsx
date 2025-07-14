import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { updateProfile } from "firebase/auth";
import { AuthContext } from "../../../Contexts/AuthContext/AuthContext";
import Swal from "sweetalert2";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // user from Firebase
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editData, setEditData] = useState({
    name: user?.displayName || "",
    photoURL: user?.photoURL || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await updateProfile(user, {
        displayName: editData.name,
        photoURL: editData.photoURL,
      });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Profile updated successfully!",
        showConfirmButton: false,
        timer: 1500
      });
      // alert("Profile updated successfully!");
      setIsModalOpen(false);
      // window.location.reload(); // Optional: refresh to reflect updated UI
    } catch (error) {
      console.error("Update failed:", error.message);
      // alert("Failed to update profile");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Welcome, {user?.displayName || "User"}!
      </h2>

      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src={user?.photoURL || "https://i.ibb.co/2K0rHHy/default-avatar.png"}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-blue-400"
        />
        <div className="text-lg space-y-2">
          <p><strong>Name:</strong> {user?.displayName}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Role:</strong> tourist</p> {/* You can replace with dynamic role if needed */}
        </div>
      </div>

      <div className="mt-6 flex gap-4 justify-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-outline btn-info"
        >
          Edit Profile
        </button>
        <button
          onClick={() => navigate("/dashboard/tour-guide")}
          className="btn btn-primary"
        >
          Apply For Tour Guide
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative">
            <h3 className="text-2xl font-semibold mb-4">Edit Profile</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Photo URL</label>
                <input
                  type="text"
                  name="photoURL"
                  value={editData.photoURL}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="text-right">
                <button
                  type="button"
                  className="btn btn-sm btn-outline mr-2"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-sm btn-success">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
