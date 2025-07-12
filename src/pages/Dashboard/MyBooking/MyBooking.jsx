import React, { Fragment, useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Dialog, Transition } from '@headlessui/react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../Contexts/AuthContext/AuthContext';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm/PaymentForm';

const MyBooking = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHED_KEY);

    const { data: bookings = [], isLoading, refetch } = useQuery({
        queryKey: ['myBookings'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings/${user?.email}`);
            return res.data;
        }
    });

    const handleCancel = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this booking!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, cancel it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/booking/${id}`);
                    if (res?.data?.deletedCount > 0) {
                        Swal.fire('Deleted!', 'Booking has been deleted.', 'success');
                        refetch();
                    } else {
                        Swal.fire('Failed!', 'Could not delete booking.', 'warning');
                    }
                } catch (error) {
                    Swal.fire('Error!', error.message, 'error');
                }
            }
        });
    };

    const openModal = (booking) => {
        setSelectedBooking(booking);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedBooking(null);
        setModalOpen(false);
    };

    if (isLoading) return <p className="text-center py-8">Loading...</p>;

    return (
        <div className="p-4 sm:p-6 max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6">My Bookings</h2>

            <div className="overflow-x-auto">
                <table className="min-w-[600px] w-full bg-white shadow-md rounded border text-sm sm:text-base">
                    <thead className="bg-gray-100">
                        <tr className="text-left">
                            <th className="py-2 px-3 sm:py-3 sm:px-4">Package</th>
                            <th className="py-2 px-3 sm:py-3 sm:px-4">Tour Guide</th>
                            <th className="py-2 px-3 sm:py-3 sm:px-4">Date</th>
                            <th className="py-2 px-3 sm:py-3 sm:px-4">Price</th>
                            <th className="py-2 px-3 sm:py-3 sm:px-4">Status</th>
                            <th className="py-2 px-3 sm:py-3 sm:px-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((b) => (
                            <tr key={b._id} className="border-t hover:bg-gray-50">
                                <td className="py-2 px-3">{b.packageName}</td>
                                <td className="py-2 px-3">{b.tourGuideName}</td>
                                <td className="py-2 px-3">{new Date(b.tourDate).toLocaleDateString()}</td>
                                <td className="py-2 px-3">${b.price}</td>
                                <td className="py-2 px-3 capitalize">{b.status}</td>
                                <td className="py-2 px-3 flex flex-col sm:flex-row gap-2 justify-center items-center sm:items-start">
                                    {b.status === 'pending' ? (
                                        <>
                                            <button
                                                onClick={() => openModal(b)}
                                                disabled={modalOpen}
                                                className={`w-full sm:w-auto px-3 py-1 rounded text-sm ${modalOpen
                                                        ? 'bg-green-300 cursor-not-allowed text-white'
                                                        : 'bg-green-500 hover:bg-green-600 text-white'
                                                    }`}
                                            >
                                                Pay
                                            </button>
                                            <button
                                                onClick={() => handleCancel(b._id)}
                                                disabled={modalOpen}
                                                className={`w-full sm:w-auto px-3 py-1 rounded text-sm ${modalOpen
                                                        ? 'bg-red-300 cursor-not-allowed text-white'
                                                        : 'bg-red-500 hover:bg-red-600 text-white'
                                                    }`}
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <span className="text-gray-500 italic">No actions</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {bookings.length === 0 && (
                    <p className="text-center mt-6 text-gray-500">No bookings found.</p>
                )}
            </div>

            {/* Modal */}
            <Transition appear show={modalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title as="h3" className="text-lg font-semibold text-gray-900">
                                        Payment Details
                                    </Dialog.Title>
                                    <div className="mt-3 space-y-2 text-sm sm:text-base">
                                        <p><strong>Package:</strong> {selectedBooking?.packageName}</p>
                                        <p><strong>Tour Guide:</strong> {selectedBooking?.tourGuideName}</p>
                                        <p><strong>Date:</strong> {new Date(selectedBooking?.tourDate).toLocaleDateString()}</p>
                                        <p><strong>Price:</strong> ${selectedBooking?.price}</p>
                                    </div>
                                    <div>
                                        <Elements stripe={stripePromise}>
                                            <PaymentForm closeModal={closeModal} selectedBooking={selectedBooking}></PaymentForm>
                                        </Elements>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default MyBooking;
