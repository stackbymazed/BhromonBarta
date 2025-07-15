import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Contexts/AuthContext/AuthContext';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../Utilis/Loading/Loading';

const AdminProfile = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [isModalOpen, setModalOpen] = useState(false);
    const [editData, setEditData] = useState({});
    const [totalPayData, setTotalPayData] = useState(0);

    // Fetch Admin Stats
    const { data: stats } = useQuery({
        queryKey: ['dashboard-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/dashboard/stats');
            return res.data;
        }
    });



    const { data: paymentsData = [] } = useQuery({
        queryKey: ['/payments'],
        queryFn: async () => {
            const res = await axiosSecure.get('/payments');
            return res.data;
        }
    });

    useEffect(() => {
        if (paymentsData.length > 0) {
            const total = paymentsData.reduce((sum, payment) => sum + payment.amount, 0);
            setTotalPayData(total);
        }
    }, [paymentsData]);

    // console.log(totalPayData);





    // Fetch Admin Profile
    const { data: adminData, isLoading: loadingAdmin, refetch } = useQuery({
        queryKey: ['admin-info', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    });


    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const { _id, ...updateFields } = editData;
        // console.log(updateFields, _id)
        try {
            await axiosSecure.patch(`/users/update/${updateFields?.email}`, updateFields);
            Swal.fire('Updated!', 'Profile updated successfully.', 'success');
            setModalOpen(false);
            refetch()
        } catch (error) {
            Swal.fire('Error', 'Something went wrong.', 'error');
        }
    };

    if (loadingAdmin) return <Loading />;
    //   if (loadingStats || loadingAdmin) return <Loading />;
    return (
        <div className="max-w-6xl mx-auto p-6">
            {/* Welcome */}
            <h2 className="text-3xl font-bold mb-6">Welcome, {adminData?.name} 👋</h2>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <StatCard label="Total Payment" value={`$${totalPayData || 0}`} />
                <StatCard label="Total Tour Guides" value={stats?.guide} />
                <StatCard label="Total Packages" value={stats?.packages} />
                <StatCard label="Total Clients" value={stats?.users} />
                <StatCard label="Total Stories" value={stats?.stories} />
            </div>

            {/* Profile Info */}
            <div className="bg-white p-6 rounded shadow flex flex-col md:flex-row items-center gap-6">
                <img
                    src={user?.photoURL }
                    alt="Admin"
                    className="w-40 h-40 object-cover rounded-full border"
                />
                <div>
                    <h3 className="text-2xl font-semibold">{adminData?.name}</h3>
                    <p><strong>Email:</strong> {adminData?.email}</p>
                    <p><strong>Role:</strong> {adminData?.role}</p>
                    <p><strong>Phone:</strong> {adminData?.phone || 'N/A'}</p>
                    <p><strong>Address:</strong> {adminData?.address || 'N/A'}</p>
                    <button
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        onClick={() => {
                            setEditData(adminData);
                            setModalOpen(true);
                        }}
                    >
                        Edit Profile
                    </button>
                </div>
            </div>

            {/* Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0  bg-opacity-30 flex justify-center items-center z-50">
                    <form
                        onSubmit={handleEditSubmit}
                        className="bg-white p-6 rounded w-full max-w-md shadow-md relative"
                    >
                        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
                        <input
                            type="text"
                            value={editData.name}
                            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                            placeholder="Name"
                            className="w-full mb-3 p-2 border rounded"
                            required
                        />
                        <input
                            type="text"
                            value={editData.photoURL}
                            onChange={(e) => setEditData({ ...editData, photoURL: e.target.value })}
                            placeholder="Photo URL"
                            className="w-full mb-3 p-2 border rounded"
                            required
                        />
                        <input
                            type="number"
                            value={editData.phone || ''}
                            onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                            placeholder="Phone"
                            className="w-full mb-3 p-2 border rounded"
                            required
                        />
                        <input
                            type="text"
                            value={editData.address || ''}
                            onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                            placeholder="Address"
                            className="w-full mb-3 p-2 border rounded"
                            required
                        />
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                className="px-4 py-2 bg-gray-300 rounded"
                                onClick={() => setModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

const StatCard = ({ label, value }) => (
    <div className="bg-blue-50 p-4 rounded shadow text-center">
        <div className="text-lg font-semibold">{label}</div>
        <div className="text-2xl font-bold text-blue-600">{value}</div>
    </div>
);

export default AdminProfile;
