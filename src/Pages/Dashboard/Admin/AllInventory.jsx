import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole'; // Assuming you have this hook
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../Coponents/LoadingSpinner/LoadingSpinner';
import Swal from 'sweetalert2';
import { FaTrashAlt, FaEdit, FaCarAlt } from 'react-icons/fa';
import LoadingPage from '../../../Coponents/Shared/LoadingPage';

const AllInventory = () => {
    const { user } = useAuth();
    const { role } = useRole(); // Get role: 'admin' or 'dealer'
    const axiosSecure = useAxiosSecure();

    const { data: cars = [], isLoading, refetch } = useQuery({
        queryKey: ['inventory', user?.email, role],
        queryFn: async () => {
            // ADMIN sees everything, DEALER sees only theirs
            const url = role === 'admin' 
                ? `/browsecars` 
                : `/dealer-inventory?email=${user?.email}`;
            const res = await axiosSecure.get(url);
            return res.data;
        }
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This vehicle will be removed from the system!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EF4444",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/cars/${id}`);
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire("Deleted!", "Vehicle removed.", "success");
                }
            }
        });
    };

    if (isLoading) return <LoadingPage></LoadingPage>;

    return (
        <div className="w-full p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <FaCarAlt className="text-primary" /> 
                    {role === 'admin' ? "Global Inventory (Admin)" : "My Fleet (Dealer)"}
                </h2>
                <div className="badge badge-secondary p-4 font-bold">Total: {cars.length}</div>
            </div>

            <div className="overflow-x-auto border rounded-box bg-base-100 shadow-sm">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-base-200 uppercase text-xs">
                            <th>Car</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Status</th>
                            {role === 'admin' && <th>Provider</th>}
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cars.map((car) => (
                            <tr key={car._id} className="hover">
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={car.image} alt="Car" />
                                            </div>
                                        </div>
                                        <div className="font-bold">{car.carName}</div>
                                    </div>
                                </td>
                                <td>{car.category}</td>
                                <td className="font-semibold">${car.rentPrice}</td>
                                <td>
                                    <span className={`badge badge-sm ${car.status === 'Available' ? 'badge-success' : 'badge-error'}`}>
                                        {car.status || "Available"}
                                    </span>
                                </td>
                                {role === 'admin' && <td className="text-xs">{car.providerEmail}</td>}
                                <td className="flex justify-center gap-2">
                                    <button className="btn btn-ghost btn-xs text-info"><FaEdit size={16}/></button>
                                    <button onClick={() => handleDelete(car._id)} className="btn btn-ghost btn-xs text-error"><FaTrashAlt size={16}/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllInventory;