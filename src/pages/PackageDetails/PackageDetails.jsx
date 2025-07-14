import React, { use, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';

const PackageDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = use(AuthContext);
    const navigate = useNavigate();

    const [packageData, setPackageData] = useState(null);
    // const [guides, setGuides] = useState([]);
    const [loading, setLoading] = useState(false);
    // const [guide,setGuide] = useState([])

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm();

    const selectedDate = watch('tourDate');

    const handlePleaseLogIn = () => {
        return navigate("/signIn")
    }
    const { data: users = [], isLoading, isError, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        },
    });

    const guides = [];
    users.map(user => {
        if (user.role === "guide") {
            // console.log(user)
            guides.push(user)
        }
        // console.log(typeof user.role)
    })
    console.log(guides)
    useEffect(() => {
        // Fetch package
        axiosSecure.get(`/packages/${id}`)
            .then(res => setPackageData(res.data))
            .catch(err => console.error(err));

        // Fetch guides
        axiosSecure.get('/guides')
            .then(res => setGuides(res.data))
            .catch(err => console.error(err));

        register('tourDate', { required: 'Tour date is required' });
    }, [axiosSecure, id, register]);

    console.log(guides)
    const onSubmit = (data) => {
        console.log(data)
        setLoading(true);
        const booking = {
            packageId: packageData._id,
            packageName: packageData.title,
            touristName: user?.displayName,
            touristEmail: user?.email,
            touristImage: user?.photoURL,
            price: packageData.price,
            tourDate: data.tourDate,
            guideId: data.guideId,
            status: 'pending',
        };

        if (user) {
            axiosSecure.post('/bookings', booking)
                .then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Booking Confirmed!',
                        text: 'Your booking was successfully placed.',
                        confirmButtonColor: '#3085d6'
                    });
                    setLoading(false);
                    navigate('/')
                })
                .catch(() => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong while booking!',
                        confirmButtonColor: '#d33'
                    });
                    setLoading(false);
                });
        }

    };



    if (!packageData) return <div className="text-center p-6">Loading...</div>;

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">
            <section className="py-6 dark:bg-gray-100 dark:text-gray-900">
                <div className="container grid grid-cols-2 gap-4 p-4 mx-auto md:grid-cols-4">
                    {(() => {
                        const gallery = packageData.gallery || [];

                        // Ensure we have exactly 5 images (repeat if needed, or slice if too many)
                        let processedGallery = [];

                        if (gallery.length >= 5) {
                            processedGallery = gallery.slice(0, 5);
                        } else {
                            let i = 0;
                            while (processedGallery.length < 5) {
                                processedGallery.push(gallery[i % gallery.length]);
                                i++;
                            }
                        }

                        return processedGallery.map((imgUrl, idx) => {
                            // Special style for the first image
                            if (idx === 0) {
                                return (
                                    <img
                                        key={idx}
                                        src={imgUrl}
                                        alt={`Gallery image ${idx + 1}`}
                                        className="w-full h-full col-span-2 row-span-2 rounded-xl shadow-lg object-cover min-h-96 md:col-start-3 md:row-start-1 aspect-square"
                                    />
                                );
                            }

                            return (
                                <img
                                    key={idx}
                                    src={imgUrl}
                                    alt={`Gallery image ${idx + 1}`}
                                    className="w-full h-full rounded-xl shadow-md object-cover min-h-48 aspect-square"
                                />
                            );
                        });
                    })()}
                </div>
            </section>
            {/* About */}
            <section>
                <h2 className="text-3xl font-bold mb-3 text-blue-700">About The Tour</h2>
                <p className="text-gray-700 leading-relaxed">{packageData.about}</p>
            </section>

            {/* Tour Plan */}
            <section>
                <h2 className="text-3xl font-bold mb-3 text-blue-700">Tour Plan</h2>
                <div className="space-y-3">
                    {packageData.tourPlan.map((dayPlan, idx) => (
                        <div key={idx} className="bg-blue-50 p-4 rounded-lg shadow">
                            <div className="font-semibold text-lg mb-1">
                                <span className="inline-block px-3 py-1 bg-blue-600 text-white rounded mr-3">{dayPlan.day}</span>
                                {dayPlan.plan}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Guides */}
            <section>
                <h2 className="text-3xl font-bold mb-4 text-blue-700">Tour Guides</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {guides.map(guide => (
                        <div
                            key={guide._id}
                            onClick={() => navigate(`/singleGuide/${guide?._id}`)}
                            className="cursor-pointer p-4 bg-white rounded-xl shadow hover:shadow-md transition"
                        >
                            <img src={guide?.photoURL} alt={guide?.name} className="w-full h-48 object-cover rounded" />
                            <h3 className="mt-3 text-xl font-bold">{guide?.name}</h3>
                            <p className="text-sm text-gray-600">{guide?.experience} years experience</p>
                            <p className="text-sm text-gray-600">Languages: {guide?.language}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Booking Form */}
            <section className="bg-gray-100 p-6 rounded-xl shadow max-w-xl mx-auto">
                <h2 className="text-3xl font-bold mb-4 text-center text-blue-700">Book This Tour</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    <input
                        type="text"
                        value={packageData.title}
                        readOnly
                        className="w-full border p-2 rounded bg-gray-200"
                    />

                    <input
                        type="text"
                        value={user?.displayName || ''}
                        readOnly
                        placeholder="Tourist Name"
                        className="w-full border p-2 rounded bg-gray-200"
                    />

                    <input
                        type="email"
                        value={user?.email || ''}
                        readOnly
                        placeholder="Tourist Email"
                        className="w-full border p-2 rounded bg-gray-200"
                    />

                    <input
                        type="text"
                        value={user?.photoURL || ''}
                        readOnly
                        placeholder="Tourist Image URL"
                        className="w-full border p-2 rounded bg-gray-200"
                    />

                    <input
                        type="number"
                        value={packageData.price}
                        readOnly
                        className="w-full border p-2 rounded bg-gray-200"
                    />

                    {/* Tour Date */}
                    <div>
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setValue("tourDate", date)}
                            minDate={new Date()}
                            placeholderText="Select Tour Date"
                            className="w-full border p-2 rounded"
                        />
                        {errors.tourDate && <p className="text-red-600 text-sm mt-1">{errors.tourDate.message}</p>}
                    </div>

                    {/* Tour Guide Dropdown */}
                    <div>
                        <select
                            {...register("guideId", { required: "Select a tour guide" })}
                            className="w-full border p-2 rounded"
                        >
                            <option value="">Select Tour Guide</option>
                            {guides.map(guide => (
                                <option key={guide?._id} value={guide?.email}>{guide?.name}</option>
                            ))}
                        </select>
                        {errors.guideId && <p className="text-red-600 text-sm mt-1">{errors.guideId.message}</p>}
                    </div>

                    {
                        user ? <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? <span className="loading loading-spinner loading-xs"></span> : 'Book Now'}
                        </button>
                            :

                            <button
                                onClick={handlePleaseLogIn}
                                className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 disabled:opacity-50"
                            >
                                Please LogIn After BOOK
                            </button>
                    }

                </form>
            </section>
        </div>
    );
};

export default PackageDetails;
