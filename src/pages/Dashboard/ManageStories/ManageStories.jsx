import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog } from "@headlessui/react";
import Swal from "sweetalert2";
import axios from "axios";
import { useState, Fragment, use } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxios from "../../../hooks/useAxios";
import moment from "moment";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { AuthContext } from "../../../Contexts/AuthContext/AuthContext";

const ManageStories = () => {
    const { user } = use(AuthContext)
    const queryClient = useQueryClient();
    const [editStory, setEditStory] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalNewPhotos, setModalNewPhotos] = useState([]);
    const [photosToRemove, setPhotosToRemove] = useState(new Set());

    const useAxiosUrl = useAxios();
    const axiosSecure = useAxiosSecure();

    const { data: stories = [], isLoading } = useQuery({
        queryKey: ["stories", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/stories/${user?.email}`);
            return res.data;
        },
    });

    const uploadToImgbb = async (imageFile) => {
        const formData = new FormData();
        formData.append("image", imageFile);

        const apiKey = import.meta.env.VITE_IMG_BB_API_KEY;

        try {
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (data?.data?.url) {
                console.log("Uploaded URL:", data.data.url);
                return data.data.url;
            } else {
                console.error("Image upload failed:", data);
                return null;
            }
        } catch (error) {
            console.error("Image upload error:", error);
            return null;
        }
    };


    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            await useAxiosUrl.delete(`/stories/${id}`);
        },
        onSuccess: () => queryClient.invalidateQueries(["stories"]),
    });

    const removePhotoMutation = useMutation({
        mutationFn: async ({ storyId, photoUrl }) => {
            console.log(storyId)
            await useAxiosUrl.delete(`/stories/${storyId}`, {
                data: { photoUrl },
            });
        },
    });

    const addPhotoMutation = useMutation({
        mutationFn: async ({ storyId, imageFile }) => {
            const imageUrl = await uploadToImgbb(imageFile);
            await useAxiosUrl.patch(`/stories/${storyId}`, { photoUrl: imageUrl });
            return imageUrl;
        },
    });

    const updateStoryDetailsMutation = useMutation({
        mutationFn: async ({ id, title, description }) => {
            await useAxiosUrl.patch(`/stories/${id}`, { title, description });
        },
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won’t be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutate(id);
                Swal.fire("Deleted!", "The story has been deleted.", "success");
            }
        });
    };

    const openEditModal = (story) => {
        setEditStory({ ...story });
        setModalNewPhotos([]);
        setPhotosToRemove(new Set());
        setIsModalOpen(true);
    };

    const toggleRemovePhoto = (photoUrl) => {
        setPhotosToRemove((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(photoUrl)) newSet.delete(photoUrl);
            else newSet.add(photoUrl);
            return newSet;
        });
    };

    const handleSave = async () => {
        if (!editStory) return;

        try {
            Swal.fire({
                title: 'Saving...',
                allowOutsideClick: false,
                didOpen: () => Swal.showLoading(),
            });

            await updateStoryDetailsMutation.mutateAsync({
                id: editStory._id,
                title: editStory.title,
                description: editStory.description,
            });

            for (const photoUrl of photosToRemove) {
                await removePhotoMutation.mutateAsync({ storyId: editStory._id, photoUrl });
            }

            for (const file of modalNewPhotos) {
                await addPhotoMutation.mutateAsync({ storyId: editStory._id, imageFile: file });
            }

            await queryClient.invalidateQueries(["stories"]);

            Swal.close();
            Swal.fire({
                icon: "success",
                title: "Saved!",
                text: "Story updated successfully.",
                timer: 2000,
                showConfirmButton: false,
            });

            setIsModalOpen(false);
            setEditStory(null);
        } catch (error) {
            Swal.close();
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong while saving!",
            });
        }
    };

    if (isLoading) return <div className="p-6 text-center"><span className="loading loading-spinner loading-xl"></span></div>;

    return (
        <>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    stories.length == 0 ? < h1 className="text-2xl font-bold ">Your are not add any story</h1> : ''

                }
                {stories.map((story) => (
                    <div
                        key={story._id}
                        className="rounded-xl shadow-lg overflow-hidden bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 text-white dark:from-gray-800 dark:via-gray-700 dark:to-gray-900"
                    >
                        {story.images?.length > 0 && (
                            <Swiper
                                modules={[Navigation]}
                                navigation
                                spaceBetween={10}
                                slidesPerView={1}
                                className="rounded-b-lg"
                            >
                                {story.images.map((img, idx) => (
                                    <SwiperSlide key={idx}>
                                        <img
                                            src={img}
                                            alt={`story-img-${idx}`}
                                            className="w-full h-48 object-cover"
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )}
                        <div className="p-5">
                            <h2 className="text-xl font-bold">{story.title}</h2>
                            <p className="text-sm mt-1">{story.description}</p>
                            <div className="text-xs mt-3 opacity-80">
                                <p>Author: {story.author}</p>
                                <p>Date: {moment(story.date).format("MMMM Do, YYYY")}</p>
                            </div>
                            <div className="flex justify-between mt-4">
                                <button
                                    onClick={() => openEditModal(story)}
                                    className="bg-white text-black bg-opacity-30 hover:bg-opacity-50 rounded px-4 py-1 font-semibold"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(story._id)}
                                    className="bg-red-600 hover:bg-red-700 rounded px-4 py-1 font-semibold"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div >

            {/* Modal */}
            < Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} as={Fragment} >
                <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
                    <Dialog.Panel className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-lg p-6 space-y-6">
                        <Dialog.Title className="text-xl font-bold text-gray-900 dark:text-gray-100">
                            Edit Story
                        </Dialog.Title>

                        <input
                            type="text"
                            value={editStory?.title || ""}
                            onChange={(e) => setEditStory((prev) => ({ ...prev, title: e.target.value }))}
                            placeholder="Title"
                            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
                        />

                        <textarea
                            value={editStory?.description || ""}
                            onChange={(e) => setEditStory((prev) => ({ ...prev, description: e.target.value }))}
                            placeholder="Description"
                            rows={4}
                            className="w-full px-3 py-2 border rounded resize-y dark:bg-gray-700 dark:text-white"
                        />

                        <div>
                            <h3 className="font-medium mb-2 dark:text-white">Existing Photos</h3>
                            <div className="flex flex-wrap gap-3 max-h-48 overflow-y-auto">
                                {editStory?.images?.map((img, i) => {
                                    const marked = photosToRemove.has(img);
                                    return (
                                        <div
                                            key={i}
                                            className={`relative w-24 h-24 rounded overflow-hidden border-4 cursor-pointer ${marked ? "border-red-600 opacity-50" : "border-transparent"
                                                }`}
                                            onClick={() => toggleRemovePhoto(img)}
                                        >
                                            <img src={img} className="object-cover w-full h-full" />
                                            {marked && (
                                                <div className="absolute inset-0 bg-red-600 bg-opacity-50 flex items-center justify-center text-white font-bold">
                                                    ✕
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div>
                            <label className="block font-semibold mb-1 dark:text-white">
                                Add New Photos
                            </label>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={(e) => setModalNewPhotos([...e.target.files])}
                            />
                        </div>

                        <div className="flex justify-end gap-4 pt-4">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded text-black font-semibold"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold"
                            >
                                Save
                            </button>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog >
        </>
    );
};

export default ManageStories;
