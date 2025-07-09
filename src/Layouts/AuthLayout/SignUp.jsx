import React, { use, useContext } from 'react';
import { useForm } from 'react-hook-form';
import Lottie from 'lottie-react';
import animationData from '../../../Animation.json';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';
import GoogleLogIn from '../../Utilis/GoogleLogIn/GoogleLogIn';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const SignUp = () => {

    const { createUser, upDateUser } = useContext(AuthContext)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const imgbbApiKey = import.meta.env.VITE_IMG_BB_API_KEY;

    const onSubmit = async (data) => {
        const imageFile = data.image[0];
        const formData = new FormData();
        formData.append("image", imageFile);

        try {
            // Upload to imgbb
            const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
                method: "POST",
                body: formData,
            });
            const result = await res.json();

            if (result.success) {
                const imageUrl = result.data.url;

                const userData = {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    image: imageUrl,
                };

                console.log("✅ User Registered:", userData);
                createUser(data.email, data.password)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        upDateUser({ displayName: data.name, photoURL: imageUrl })
                            .then(() => {
                                // Profile updated!
                                // ...
                            }).catch((error) => {
                                // An error occurred
                                // ...
                            });
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Successfully login ",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        // Reset form
                        reset();

                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                    });



                // TODO : amare date database e POST  korte hobe

            } else {
                alert("❌ Image upload failed");
            }
        } catch (error) {
            console.error("❌ Error uploading image:", error);
            alert("Something went wrong");
        }
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            {/* Lottie animation */}
            <div className="flex-1 flex items-center justify-center bg-gray-100 p-6">
                <Lottie animationData={animationData} loop className="w-full max-w-md" />
            </div>

            {/* Signup form */}
            <div className="flex-1 flex items-center justify-center p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 space-y-2">
                    <h2 className="text-3xl font-bold text-center mb-4">Create Account</h2>

                    {/* Name */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            {...register("name", { required: "Name is required" })}
                            className="input input-bordered w-full"
                            placeholder="Your name"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                    message: "Invalid email address",
                                },
                            })}
                            className="input input-bordered w-full"
                            placeholder="Your email"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    {/* Image */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Profile Image</label>
                        <input
                            type="file"
                            {...register("image", { required: "Image is required" })}
                            className="file-input file-input-bordered w-full"
                            accept="image/*"
                        />
                        {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Minimum 6 characters required",
                                },
                            })}
                            className="input input-bordered w-full"
                            placeholder="Your password"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>
                    <p className="text-center text-sm">
                        Have an account?{" "}
                        <Link to="/signIn" className="text-blue-500 hover:underline">
                            Sign In
                        </Link>
                    </p>
                    <input type="submit" value="Sign Up" className="btn btn-primary w-full" />
                    <GoogleLogIn></GoogleLogIn>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
