// // import React, { useState } from 'react';
// // import { useQuery } from '@tanstack/react-query';
// // import Select from 'react-select';
// // import useAxiosSecure from '../../../hooks/useAxiosSecure';

// // const roleOptions = [
// //     { value: '', label: 'All Roles' },
// //     { value: 'admin', label: 'Admin' },
// //     { value: 'tourist', label: 'Tourist' },
// //     { value: 'guide', label: 'Tour Guide' },
// // ];

// // const ManageUsers = () => {
// //     const axiosSecure = useAxiosSecure();
// //     const [searchText, setSearchText] = useState('');
// //     const [selectedRole, setSelectedRole] = useState(roleOptions[0]);

// //     const { data: users = [], isLoading } = useQuery({
// //         queryKey: ['users', searchText, selectedRole?.value],
// //         queryFn: async () => {
// //             const res = await axiosSecure.get('/users', {
// //                 params: {
// //                     search: searchText,
// //                     role: selectedRole?.value || '',
// //                 },
// //             });
// //             return res.data;
// //         },
// //     });

// //     return (
// //         <div className="p-6">
// //             <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

// //             {/* Search and Filter */}
// //             <div className="flex flex-col md:flex-row gap-4 mb-4">
// //                 <input
// //                     type="text"
// //                     placeholder="Search by name or email"
// //                     value={searchText}
// //                     onChange={(e) => setSearchText(e.target.value)}
// //                     className="input input-bordered w-full md:w-1/2"
// //                 />
// //                 <div className="w-full md:w-1/4">
// //                     <Select
// //                         options={roleOptions}
// //                         value={selectedRole}
// //                         onChange={setSelectedRole}
// //                         className="text-sm"
// //                     />
// //                 </div>
// //             </div>

// //             {/* User Table */}
// //             <div className="overflow-x-auto">
// //                 <table className="table w-full table-zebra">
// //                     <thead className="bg-base-200">
// //                         <tr>
// //                             <th>#</th>
// //                             <th>Name</th>
// //                             <th>Email</th>
// //                             <th>Photo</th>
// //                             <th>Phone</th>
// //                             <th>Address</th>
// //                             <th>Role</th>
// //                         </tr>
// //                     </thead>
// //                     <tbody>
// //                         {users?.map((user, idx) => (
// //                             <tr key={user._id}>
// //                                 <td>{idx + 1}</td>
// //                                 <td>{user.name}</td>
// //                                 <td>{user.email}</td>
// //                                 <td>
// //                                     <img
// //                                         src={user.photoURL}
// //                                         alt={user.name}
// //                                         className="w-10 h-10 rounded-full object-cover"
// //                                     />
// //                                 </td>
// //                                 <td>{user.phone || '-'}</td>
// //                                 <td>{user.address || '-'}</td>
// //                                 <td>{user.role}</td>
// //                             </tr>
// //                         ))}
// //                     </tbody>
// //                 </table>

// //                 {users?.length === 0 && !isLoading && (
// //                     <p className="text-center mt-4 text-gray-500">No users found</p>
// //                 )}
// //             </div>
// //         </div>
// //     );
// // };

// // export default ManageUsers;

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

const perPageOptions = [
  { value: 5, label: '5 per page' },
  { value: 10, label: '10 per page' },
  { value: 20, label: '20 per page' },
  { value: 50, label: '50 per page' },
];

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const [searchText, setSearchText] = useState('');
  const [selectedRole, setSelectedRole] = useState(roleOptions[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(perPageOptions[0]); 

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users', searchText, selectedRole?.value],
    queryFn: async () => {
      const res = await axiosSecure.get('/users', {
        params: {
          search: searchText,
          role: selectedRole?.value || '',
        },
      });
      // Ensure users is always an array
      return Array.isArray(res.data) ? res.data : [];
    },
  });

//   console.log(users)

  // Pagination logic
  const totalUsers = users.length;
  const totalPages = Math.ceil(totalUsers / usersPerPage.value);

  // Safely slice users array if array, else empty array
  const paginatedUsers = Array.isArray(users)
    ? users.slice(
        (currentPage - 1) * usersPerPage.value,
        currentPage * usersPerPage.value
      )
    : [];

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // When filters or perPage change, reset to page 1
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1);
  };

  const handleRoleChange = (option) => {
    setSelectedRole(option);
    setCurrentPage(1);
  };

  const handlePerPageChange = (option) => {
    setUsersPerPage(option);
    setCurrentPage(1);
  };

  return (
    <div className="p-6 dark:text-white">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Manage Users</h2>

      {/* Filters and Per Page */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center dark:text-white">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchText}
          onChange={handleSearchChange}
          className="input input-bordered w-full md:w-1/2"
        />
        <div className="w-full md:w-1/4">
          <Select
            options={roleOptions}
            value={selectedRole}
            onChange={handleRoleChange}
            className="text-sm"
            isSearchable={false}
          />
        </div>
        <div className="w-full md:w-1/5">
          <Select
            options={perPageOptions}
            value={usersPerPage}
            onChange={handlePerPageChange}
            className="text-sm"
            isSearchable={false}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded shadow-sm">
        <table className="min-w-full table-auto text-sm text-left text-gray-700 ">
          <thead className="bg-gray-100 text-gray-600 dark:text-black uppercase text-xs">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Photo</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Address</th>
              <th className="p-3">Role</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user, idx) => (
              <tr key={user._id} className="border-b hover:bg-gray-50 dark:text-white">
                <td className="p-3">{(currentPage - 1) * usersPerPage.value + idx + 1}</td>
                <td className="p-3 font-medium">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">
                  <img
                    src={user.photoURL}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                </td>
                <td className="p-3">{user.phone || '-'}</td>
                <td className="p-3">{user.address || '-'}</td>
                <td className="p-3">
                  <span
                    className={`
                      px-2 py-1 text-xs font-semibold rounded
                      ${user.role === 'admin' ? 'bg-red-100 text-red-600' : ''}
                      ${user.role === 'guide' ? 'bg-blue-100 text-blue-600' : ''}
                      ${user.role === 'tourist' ? 'bg-green-100 text-green-600' : ''}
                    `}
                  >
                    {user.role || 'tourist'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!isLoading && users.length === 0 && (
          <div className="text-center text-gray-500 py-6">
            No users found matching your filters.
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center items-center gap-2 flex-wrap">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 dark:text-black"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:text-black'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 dark:text-black"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
