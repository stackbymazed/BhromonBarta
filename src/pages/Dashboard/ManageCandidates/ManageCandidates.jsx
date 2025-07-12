import React, { useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Contexts/AuthContext/AuthContext';
import useAxiosSecure from '../../../hooks/useAxiosSecure';


const ManageCandidates = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const { user } = useContext(AuthContext); // ✅ now properly using user

    // Fetch all applications
    const { data: candidates = [], isLoading } = useQuery({
        queryKey: ['candidates'],
        queryFn: async () => {
            const res = await axiosSecure.get('/applications');
            return res.data;
        },
    });

    // Reject mutation unchanged
    const rejectCandidate = useMutation({
        mutationFn: async (id) => {
            await axiosSecure.delete(`/applications/${id}`);
        },
        onSuccess: () => {
            Swal.fire('Rejected!', 'Application removed.', 'info');
            queryClient.invalidateQueries(['candidates']);
        },
        onError: () => {
            Swal.fire('Error', 'Failed to reject application.', 'error');
        },
    });

    // ✅ Updated Accept handler (mutation removed)
    const handleAccept = async (applicant) => {
        console.log(applicant)
        Swal.fire({
            title: 'Are you sure?',
            text: `Promote ${applicant.applicantEmail} to tour guide?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, accept!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // 1. Promote user
                    await axiosSecure.patch(`/users/accept/${applicant.applicantEmail}`, {
                        role: 'guide',
                    });

                    // 2. Delete application
                    await axiosSecure.delete(`/applications/${applicant._id}`);

                    // 3. Show success & refresh
                    Swal.fire('Accepted!', 'Candidate promoted.', 'success');
                    queryClient.invalidateQueries(['candidates']);
                } catch (error) {
                    Swal.fire('Error', 'Failed to promote candidate.', 'error');
                }
            }
        });
    };

    // handleReject unchanged
    const handleReject = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Reject and delete this application?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, reject!',
        }).then((result) => {
            if (result.isConfirmed) {
                rejectCandidate.mutate(id);
            }
        });
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Manage Candidates</h2>

            {isLoading ? (
                <p>Loading...</p>
            ) : candidates.length === 0 ? (
                <p>No candidate applications found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full table-zebra">
                        <thead className="bg-base-200">
                            <tr>
                                <th>#</th>
                                <th>Email</th>
                                <th>CV/Experience</th>
                                <th>Intention</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {candidates.map((application, idx) => (
                                <tr key={application._id}>
                                    <td>{idx + 1}</td>
                                    <td>{application.applicantEmail}</td>
                                    <td>
                                        <a
                                            href={application.cvLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 underline"
                                        >
                                            View CV
                                        </a>
                                    </td>
                                    <td>{application.reason || '-'}</td>
                                    <td>{application.status}</td>
                                    <td>{new Date(application.submittedAt).toLocaleDateString()}</td>
                                    <td className="flex gap-2">
                                        <button
                                            className="btn btn-sm btn-success"
                                            onClick={() => handleAccept(application)}
                                        >
                                            Accept
                                        </button>
                                        <button
                                            className="btn btn-sm btn-error"
                                            onClick={() => handleReject(application._id)}
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ManageCandidates;
