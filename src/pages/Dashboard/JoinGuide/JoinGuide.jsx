import React, { use } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Contexts/AuthContext/AuthContext";

const JoinGuide = () => {
    const AxiosSecure = useAxiosSecure()
    const {user} = use(AuthContext)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const applicationData = {
            ...data,
            applicantEmail: user?.email,
            status: "pending",
            submittedAt: new Date()
        };
        console.log(applicationData)
        try {
            const res = await AxiosSecure.post("/guide-applications", applicationData);

            if (res.data?.success) {
                Swal.fire({
                    icon: "success",
                    title: "Application Successful!",
                    text: "Your request to become a tour guide has been submitted.",
                    confirmButtonColor: "#3085d6",
                });
                reset(); // clear form
            } else {
                throw new Error("Application failed");
            }
        } catch (error) {
            console.error("Application Error:", error);
            Swal.fire({
                icon: "error",
                title: "Submission Failed",
                text: "There was an error submitting your application.",
            });
        }
    };


    return (
        <div className="max-w-md mx-auto p-6 border rounded shadow mt-10 bg-white">
            <h2 className="text-2xl font-bold mb-4 text-center">Join as Tour Guide</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* Application Title */}
                <div>
                    <label className="block font-semibold mb-1">Application Title</label>
                    <input
                        type="text"
                        {...register("title", { required: "Title is required" })}
                        className="w-full border px-3 py-2 rounded"
                        placeholder="Enter application title"
                    />
                    {errors.title && (
                        <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
                    )}
                </div>

                {/* Reason */}
                <div>
                    <label className="block font-semibold mb-1">Why do you want to be a Tour Guide?</label>
                    <textarea
                        {...register("reason", {
                            required: "This field is required",
                            minLength: {
                                value: 10,
                                message: "Must be at least 10 characters",
                            },
                        })}
                        rows={4}
                        className="w-full border px-3 py-2 rounded"
                        placeholder="Explain your motivation"
                    ></textarea>
                    {errors.reason && (
                        <p className="text-red-600 text-sm mt-1">{errors.reason.message}</p>
                    )}
                </div>

                {/* CV Link */}
                <div>
                    <label className="block font-semibold mb-1">CV Link</label>
                    <input
                        type="url"
                        {...register("cvLink", {
                            required: "CV link is required",
                            pattern: {
                                value: /^(https?:\/\/)?([\w.-]+)+(:\d+)?(\/([\w/_-]+))*\/?$/,
                                message: "Enter a valid URL",
                            },
                        })}
                        className="w-full border px-3 py-2 rounded"
                        placeholder="Paste your CV link"
                    />
                    {errors.cvLink && (
                        <p className="text-red-600 text-sm mt-1">{errors.cvLink.message}</p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default JoinGuide;
