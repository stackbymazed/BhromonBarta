import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Select from 'react-select';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const roleOptions = [
    { value: '', label: 'All Roles' },
    { value: 'admin', label: 'Admin' },
    { value: 'tourist', label: 'Tourist' },
    { value: 'guide', label: 'Tour Guide' },
];

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [searchText, setSearchText] = useState('');
    const [selectedRole, setSelectedRole] = useState(roleOptions[0]);

    const { data: users = [], isLoading } = useQuery({
        queryKey: ['users', searchText, selectedRole?.value],
        queryFn: async () => {
            const res = await axiosSecure.get('/users', {
                params: {
                    search: searchText,
                    role: selectedRole?.value || '',
                },
            });
            return res.data;
        },
    });

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search by name or email"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="input input-bordered w-full md:w-1/2"
                />
                <div className="w-full md:w-1/4">
                    <Select
                        options={roleOptions}
                        value={selectedRole}
                        onChange={setSelectedRole}
                        className="text-sm"
                    />
                </div>
            </div>

            {/* User Table */}
            <div className="overflow-x-auto">
                <table className="table w-full table-zebra">
                    <thead className="bg-base-200">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Photo</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user, idx) => (
                            <tr key={user._id}>
                                <td>{idx + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <img
                                        src={user.photoURL}
                                        alt={user.name}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                </td>
                                <td>{user.phone || '-'}</td>
                                <td>{user.address || '-'}</td>
                                <td>{user.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {users?.length === 0 && !isLoading && (
                    <p className="text-center mt-4 text-gray-500">No users found</p>
                )}
            </div>
        </div>
    );
};

export default ManageUsers;
