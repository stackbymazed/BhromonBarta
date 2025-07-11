import React, { use } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../Contexts/AuthContext/AuthContext';

const ManageCandidates = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const { user: nayem } = use(AuthContext)

    // Fetch all applications
    const { data: candidates = [], isLoading } = useQuery({
        queryKey: ['candidates'],
        queryFn: async () => {
            const res = await axiosSecure.get('/applications');
            return res.data;
        },
    });

    // Accept: Update role + delete application
    const acceptCandidate = useMutation({
        mutationFn: async (user) => {
            await axiosSecure.patch(`/users/${user.email}`, { role: 'tour-guide' });
            await axiosSecure.delete(`/applications/${user._id}`);
        },
        onSuccess: () => {
            Swal.fire('Accepted!', 'Candidate is now a tour guide.', 'success');
            queryClient.invalidateQueries(['candidates']);
        },
        onError: () => {
            Swal.fire('Error', 'Failed to accept candidate.', 'error');
        },
    });

    // Reject: delete only
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

    const handleAccept = (applicant) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Promote ${applicant.email} to tour guide?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, accept!',
        }).then((result) => {
            if (result.isConfirmed) {
                acceptCandidate.mutate(applicant);
            }
        });
    };


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
                                <th>Email</th>
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
                                            onClick={() => handleAccept({ email: application.applicantEmail, _id: application._id })}
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
