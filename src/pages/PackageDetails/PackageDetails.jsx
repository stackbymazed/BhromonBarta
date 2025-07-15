import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { motion } from 'framer-motion';

const PackageDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const { width, height } = useWindowSize();

    const [packageData, setPackageData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
    const [showCongrats, setShowCongrats] = useState(false);


    const bgVariants = {
        animate: {
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            transition: {
                duration: 25,
                repeat: Infinity,
                ease: "linear",
            },
        },
    };

    useEffect(() => {
        if (showCongrats) {
            const timer = setTimeout(() => {
                setShowCongrats(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [showCongrats]);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm();

    const selectedDate = watch('tourDate');

    const handlePleaseLogIn = () => navigate('/signIn');

    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        },
    });

    const guides = users.filter(user => user.role === 'guide');

    useEffect(() => {
        axiosSecure.get(`/packages/${id}`)
            .then(res => setPackageData(res.data))
            .catch(err => console.error(err));

        register('tourDate', { required: 'Tour date is required' });
    }, [axiosSecure, id, register]);

    const onSubmit = (data) => {
        setLoading(true);
        const booking = {
            packageId: packageData._id,
            packageName: packageData.title,
            touristName: user?.displayName,
            touristEmail: user?.email,
            touristImage: user?.photoURL,
            price: packageData.price,
            tourDate: data.tourDate,
            guideEmail: data.guideId,
            status: 'pending',
        };

        if (user) {
            axiosSecure.post('/bookings', booking)
                .then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Booking Confirmed!',
                        text: 'Your booking was successfully placed.',
                        confirmButtonColor: '#3085d6',
                    });

                    axiosSecure.get(`/bookings?email=${user.email}`)
                        .then(res => {
                            if (res.data.length >= 3) {
                                setShowCongrats(true);
                            }
                        });

                    setIsBookingConfirmed(true);
                })
                .catch(() => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong while booking!',
                        confirmButtonColor: '#d33',
                    });
                })
                .finally(() => setLoading(false));
        }
    };

    if (!packageData) return <div className="text-center p-6"><span className="loading loading-spinner loading-xl"></span></div>;

    return (
        <motion.div
            className={`
          min-h-screen 
          bg-gradient-to-r 
          from-pink-100 via-yellow-100 to-green-100 
          dark:from-purple-900 dark:via-blue-900 dark:to-black 
          bg-[length:200%_200%] 
          animate-bg
          dark:text-white
          p-6
        `}
            variants={bgVariants}
            animate="animate"
            style={{ minHeight: '100vh' }}
        >
            <div className="max-w-6xl mx-auto p-6 space-y-8 relative">
                {/* Gallery ata ami mamba ui thake nici*/}
                <section className="py-6">
                    <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-4">
                        {(() => {
                            const gallery = packageData.gallery || [];
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

                            return processedGallery.map((imgUrl, idx) => (
                                <img
                                    key={idx}
                                    src={imgUrl}
                                    alt={`Gallery image ${idx + 1}`}
                                    className={`w-full h-full rounded-xl shadow-md object-cover ${idx === 0
                                        ? 'col-span-2 row-span-2 min-h-96 md:col-start-3 md:row-start-1 aspect-square'
                                        : 'min-h-48 aspect-square'
                                        }`}
                                />
                            ));
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
                                    <span className="inline-block px-3 py-1 bg-blue-600 text-white rounded mr-3">
                                        {dayPlan.day}
                                    </span>
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
                                onClick={() => navigate(`/guides-profile`)}
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
                {showCongrats && (
                    <>
                        <Confetti
                            width={window.innerWidth}
                            height={window.innerHeight}
                            style={{
                                zIndex: 9999,
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                pointerEvents: 'none',
                            }}
                        />
                        <div className="fixed top-12 left-1/2 transform -translate-x-1/2 bg-green-100 text-green-800 px-6 py-3 rounded-xl shadow-xl text-lg font-semibold z-[10000]">
                            🎉 Congratulations! You have booked more than 3 tours!
                        </div>
                    </>
                )}


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
                            className="w-full border p-2 rounded bg-gray-200"
                        />
                        <input
                            type="email"
                            value={user?.email || ''}
                            readOnly
                            className="w-full border p-2 rounded bg-gray-200"
                        />
                        <input
                            type="text"
                            value={user?.photoURL || ''}
                            readOnly
                            className="w-full border p-2 rounded bg-gray-200"
                        />
                        <input
                            type="number"
                            value={packageData.price}
                            readOnly
                            className="w-full border p-2 rounded bg-gray-200"
                        />

                        {/* Date Picker */}
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

                        {/* Guide Dropdown */}
                        <div>
                            <select
                                {...register("guideId", { required: "Select a tour guide" })}
                                className="w-full border p-2 rounded"
                            >
                                <option value="">Select Tour Guide</option>
                                {guides.map(guide => (
                                    <option key={guide._id} value={guide.email}>{guide.name}</option>
                                ))}
                            </select>
                            {errors.guideId && <p className="text-red-600 text-sm mt-1">{errors.guideId.message}</p>}
                        </div>

                        {user ? (
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 disabled:opacity-50"
                            >
                                {loading ? <span className="loading loading-spinner loading-xs"></span> : 'Book Now'}
                            </button>
                        ) : (
                            <button
                                onClick={handlePleaseLogIn}
                                className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
                            >
                                Please Log In Before Booking
                            </button>
                        )}
                    </form>
                </section>

                {/* Booking Confirmation Modal */}
                {isBookingConfirmed && (
                    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/30 flex items-center justify-center">
                        <div className="bg-white rounded-xl p-6 shadow-xl w-full max-w-sm">
                            <h2 className="text-2xl font-bold text-green-600 text-center mb-4">Confirm your Booking</h2>
                            <p className="text-gray-700 text-center mb-4">Your booking request has been placed and is currently pending.</p>
                            <div className="flex justify-center space-x-3">
                                <Link to="/dashboard/bookings" className="btn btn-primary btn-sm">
                                    Go to My Bookings
                                </Link>
                                <button onClick={() => setIsBookingConfirmed(false)} className="btn btn-ghost btn-sm">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </motion.div >
    );
};

export default PackageDetails;
