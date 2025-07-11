import React, { use } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Contexts/AuthContext/AuthContext';

const MyBooking = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const {user} = use(AuthContext)

    // Fetch bookings
    const { data: bookings = [], isLoading } = useQuery({
        queryKey: ['myBookings'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings/${user?.email}`);
            return res.data;
        }
    });

    // Cancel booking
    const cancelBooking = useMutation({
        mutationFn: async (id) => {
            await axiosSecure.delete(`/bookings/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['myBookings']);
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
        }).then((result) => {
            if (result.isConfirmed) {
                cancelBooking.mutate(id, {
                    onSuccess: () => {
                        Swal.fire('Cancelled!', 'Your booking has been cancelled.', 'success');
                    },
                    onError: () => {
                        Swal.fire('Failed!', 'Something went wrong while cancelling.', 'error');
                    }
                });
            }
        });
    };


    if (isLoading) return <p className="text-center py-8">Loading...</p>;

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h2 className="text-3xl font-semibold mb-6">My Bookings</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded border">
                    <thead className="bg-gray-100">
                        <tr className="text-left">
                            <th className="py-3 px-4">Package</th>
                            <th className="py-3 px-4">Tour Guide</th>
                            <th className="py-3 px-4">Date</th>
                            <th className="py-3 px-4">Price</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((b) => (
                            <tr key={b._id} className="border-t hover:bg-gray-50">
                                <td className="py-3 px-4">{b.packageName}</td>
                                <td className="py-3 px-4">{b.tourGuideName}</td>
                                <td className="py-3 px-4">{new Date(b.tourDate).toLocaleDateString()}</td>
                                <td className="py-3 px-4">${b.price}</td>
                                <td className="py-3 px-4 capitalize">{b.status}</td>
                                <td className="py-3 px-4 flex gap-2 justify-center">
                                    {b.status === 'pending' ? (
                                        <>
                                            {/* Disabled Pay Button */}
                                            <button
                                                disabled
                                                className="bg-blue-400 text-white px-3 py-1 rounded text-sm cursor-not-allowed"
                                            >
                                                Pay (coming soon)
                                            </button>

                                            {/* Cancel Button */}
                                            <button
                                                onClick={() => handleCancel(b._id)}
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
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
        </div>
    );
};

export default MyBooking;
