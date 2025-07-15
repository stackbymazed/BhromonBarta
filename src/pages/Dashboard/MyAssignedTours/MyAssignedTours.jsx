import React, { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import moment from "moment";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Contexts/AuthContext/AuthContext";

const MyAssignedTours = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: assignedTours = [], isLoading } = useQuery({

        queryKey: ["assignedTours", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/assigned-tours/${user?.email}`);
            return res.data;
        },
    });

    const updateStatusMutation = useMutation({
        mutationFn: async ({ id, newStatus }) => {
            await axiosSecure.patch(`/assigned-tours/${id}`, { status: newStatus });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["assignedTours"]);
        },
    });

    const handleAccept = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to accepted this tour?",
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, reject it!",
        }).then((result) => {
            if (result.isConfirmed) {
                updateStatusMutation.mutate({ id, newStatus: "Accepted" });
                Swal.fire("Accepted!", "The tour has been accepted.", "success");
            }
        });

    };

    const handleReject = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to reject this tour?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, reject it!",
        }).then((result) => {
            if (result.isConfirmed) {
                updateStatusMutation.mutate({ id, newStatus: "Rejected" });
                Swal.fire("Rejected!", "The tour has been rejected.", "success");
            }
        });
    };

    if (isLoading) return <div className="p-6 text-center">Loading...</div>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">My Assigned Tours</h2>
            {
                assignedTours.length === 0 ? (
                    <p className="text-gray-600">No tours assigned yet.</p>
                ) : (
                    <div className="overflow-x-auto rounded shadow-md">
                        <table className="min-w-[800px] w-full text-sm text-left text-gray-700">
                            <thead className="text-xs uppercase bg-gray-100 text-gray-600">
                                <tr>
                                    <th className="p-3 border">Package Name</th>
                                    <th className="p-3 border">Tourist</th>
                                    <th className="p-3 border">Tour Date</th>
                                    <th className="p-3 border">Price</th>
                                    <th className="p-3 border">Status</th>
                                    <th className="p-3 border">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {assignedTours.map((tour) => (
                                    <tr key={tour._id} className="bg-white border-b hover:bg-gray-50">
                                        <td className="p-3 font-medium text-gray-900">{tour.packageName}</td>
                                        <td className="p-3">
                                            <div className="flex items-center gap-2">
                                                <img src={tour.touristImage} alt="tourist" className="w-9 h-9 rounded-full object-cover border" />
                                                <span>{tour.touristName}</span>
                                            </div>
                                        </td>
                                        <td className="p-3">{moment(tour.tourDate).format("MMM Do, YYYY")}</td>
                                        <td className="p-3 font-semibold">${tour.price}</td>
                                        <td className="p-3">
                                            <span
                                                className={`
                                            px-2 py-1 rounded text-xs font-semibold
                                            ${tour.status === "pending" && "bg-yellow-100 text-yellow-700"}
                                            ${tour.status === "in review" && "bg-blue-100 text-blue-700"}
                                            ${tour.status === "Accepted" && "bg-green-100 text-green-700"}
                                            ${tour.status === "Rejected" && "bg-red-100 text-red-700"}
                                        `}
                                            >
                                                {tour.status}
                                            </span>
                                        </td>
                                        <td className="p-3 flex gap-2 flex-wrap">
                                            <button
                                                onClick={() => handleAccept(tour._id)}
                                                disabled={tour.status !== "in review"}
                                                className={`px-3 py-1 rounded font-medium transition 
                                            ${tour.status === "in review"
                                                        ? "bg-green-600 hover:bg-green-700 text-white"
                                                        : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}
                                            >
                                                Accept
                                            </button>

                                            {tour.status === "in review" && (
                                                <button
                                                    onClick={() => handleReject(tour._id)}
                                                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded font-medium transition"
                                                >
                                                    Reject
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
            }
        </div>

    );
};

export default MyAssignedTours;
