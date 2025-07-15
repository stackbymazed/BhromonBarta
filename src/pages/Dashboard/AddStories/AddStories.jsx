import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../../Contexts/AuthContext/AuthContext';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';


const AddStory = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [uploading, setUploading] = useState(false);

    const axiosSecure = useAxiosSecure()

    const onSubmit = async (data) => {
        setUploading(true);
        const imageFiles = data.images;
        const uploadedImageUrls = [];

        // Upload each image to imgbb
        for (let i = 0; i < imageFiles.length; i++) {
            const formData = new FormData();
            formData.append("image", imageFiles[i]);

            try {
                const res = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_BB_API_KEY}`,
                    formData
                );
                uploadedImageUrls.push(res.data.data.url);
            } catch (err) {
                console.error("Image Upload Failed", err);
            }
        }

        const story = {
            title: data.title,
            description: data.description,
            images: uploadedImageUrls,
            author: user?.displayName || "Anonymous",
            email: user?.email,
            date: new Date().toISOString()
        };

        // console.log(story)
        // Send to backend (replace with your own endpoint or Firebase)
        try {
            const { data } = await axiosSecure.post("/stories", story)
            if (data.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Story add Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            reset();
            navigate("/dashboard/manage-stories");
        } catch (err) {
            console.error("Story upload failed", err);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-8 bg-white rounded shadow mt-10">
            <h2 className="text-3xl font-bold mb-6 text-center">Add Your Travel Story</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* Title */}
                <div>
                    <label className="block font-medium mb-1">Title</label>
                    <input
                        type="text"
                        {...register("title", { required: "Title is required" })}
                        className="input input-bordered w-full"
                        placeholder="Story title"
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                </div>

                {/* Description */}
                <div>
                    <label className="block font-medium mb-1">Description</label>
                    <textarea
                        {...register("description", { required: "Description is required" })}
                        className="textarea textarea-bordered w-full h-40"
                        placeholder="Share your journey..."
                    ></textarea>
                    {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                </div>

                {/* Multiple Image Upload */}
                <div>
                    <label className="block font-medium mb-1">Upload Images</label>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        {...register("images", { required: "At least one image is required" })}
                        className="file-input file-input-bordered w-full"
                    />
                    {errors.images && <p className="text-red-500 text-sm">{errors.images.message}</p>}
                </div>

                <button type="submit" className="btn btn-primary w-full" disabled={uploading}>
                    {uploading ? "Uploading..." : "Submit Story"}
                </button>
            </form>
        </div>
    );
};

export default AddStory;
