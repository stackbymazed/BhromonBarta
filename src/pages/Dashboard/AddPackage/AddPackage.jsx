import { useForm, useFieldArray } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddPackage = () => {
    const axiosSecure = useAxiosSecure()
    const { register, handleSubmit, control, reset, formState: { errors }, } = useForm({
        defaultValues: {
            gallery: [""],
            tourPlan: [{ day: "", plan: "" }],
        },
    });

    const {
        fields: galleryFields,
        append: appendGallery,
        remove: removeGallery,
    } = useFieldArray({ control, name: "gallery" });

    const {
        fields: tourPlanFields,
        append: appendPlan,
        remove: removePlan,
    } = useFieldArray({ control, name: "tourPlan" });

    const onSubmit = async (data) => {
        try {
            const packageData = {
                ...data,
                createdAt: new Date(),
                status: "available",
            };

            // console.log(packageData)
            const res = await axiosSecure.post("/packages", packageData);
            if (res.data.insertedId) {
                Swal.fire({
                    title: "Success!",
                    text: "Package added successfully!",
                    icon: "success",
                });
                // reset();
            }
        } catch (err) {
            console.error("Error adding package:", err);
            Swal.fire("Error", "Something went wrong", "error");
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4 text-center">Add New Tour Package</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                {/* Package Title */}
                <div>
                    <label className="font-semibold block mb-1">Package Name</label>
                    <input
                        {...register("title", { required: "Package title is required" })}
                        className="w-full border px-3 py-2 rounded"
                        placeholder="Enter package name"
                    />
                    {errors.title && <p className="text-red-600">{errors.title.message}</p>}
                </div>

                {/* Gallery Images */}
                <div>
                    <label className="font-semibold block mb-1">Gallery Images (URLs)</label>
                    {galleryFields.map((item, index) => (
                        <div key={item.id} className="flex gap-2 mb-2">
                            <input
                                {...register(`gallery.${index}`)}
                                className="w-full border px-2 py-1 rounded"
                                placeholder={`Image ${index + 1} URL`}
                            />
                            <button
                                type="button"
                                onClick={() => removeGallery(index)}
                                className="bg-red-500 text-white px-2 rounded"
                            >
                                X
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => appendGallery("")}
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                        + Add Image
                    </button>
                </div>

                {/* About Tour */}
                <div>
                    <label className="font-semibold block mb-1">About the Tour</label>
                    <textarea
                        {...register("about", { required: "Tour description is required" })}
                        rows={4}
                        className="w-full border px-3 py-2 rounded"
                        placeholder="Describe the tour"
                    ></textarea>
                    {errors.about && <p className="text-red-600">{errors.about.message}</p>}
                </div>

                {/* Tour Plan */}
                <div>
                    <label className="font-semibold block mb-1">Tour Plan (Days)</label>
                    {tourPlanFields.map((item, index) => (
                        <div key={item.id} className="flex flex-col md:flex-row gap-3 mb-2">
                            <input
                                {...register(`tourPlan.${index}.day`, {
                                    required: "Day is required",
                                })}
                                placeholder="Day 1, Day 2..."
                                className="border px-2 py-1 rounded w-full md:w-1/3"
                            />
                            <input
                                {...register(`tourPlan.${index}.plan`, {
                                    required: "Plan is required",
                                })}
                                placeholder="Tour plan details"
                                className="border px-2 py-1 rounded w-full"
                            />
                            <button
                                type="button"
                                onClick={() => removePlan(index)}
                                className="bg-red-500 text-white px-2 rounded"
                            >
                                X
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => appendPlan({ day: "", plan: "" })}
                        className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                        + Add Day
                    </button>
                </div>

                {/* Price */}
                <div>
                    <label className="font-semibold block mb-1">Tour Price ($)</label>
                    <input
                        type="number"
                        {...register("price", { required: "Price is required" })}
                        className="w-full border px-3 py-2 rounded"
                        placeholder="Enter price"
                    />
                    {errors.price && <p className="text-red-600">{errors.price.message}</p>}
                </div>

                {/* Duration */}
                <div>
                    <label className="font-semibold block mb-1">Duration (Days)</label>
                    <input
                        type="number"
                        {...register("duration", { required: "Duration is required" })}
                        className="w-full border px-3 py-2 rounded"
                        placeholder="Enter total days"
                    />
                    {errors.duration && <p className="text-red-600">{errors.duration.message}</p>}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-blue-700 text-white py-2 rounded font-semibold hover:bg-blue-800"
                >
                    Add Package
                </button>
            </form>
        </div>
    );
};

export default AddPackage;
