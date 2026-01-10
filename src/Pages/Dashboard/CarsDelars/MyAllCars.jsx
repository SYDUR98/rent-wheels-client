import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
 // Import your custom hook

const MyAllCars = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { user } = useAuth(); // Get current logged-in user
  const axiosSecure = useAxiosSecure(); // Initialize secure axios instance

  useEffect(() => {
    const fetchInventory = async () => {
      // Avoid calling API if user email is not available yet
      if (!user?.email) return;

      try {
        setLoading(true);
        
        // Use axiosSecure to automatically include the Bearer token
        // baseURL is already set in your hook, so just use the endpoint
        const res = await axiosSecure.get(`/dealer-inventory?email=${user?.email}`);
        
        setInventory(res.data);
      } catch (err) {
        // Errors (401/403) will be handled by your useAxiosSecure interceptor
        console.error("Error fetching inventory", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [user?.email, axiosSecure]); // Dependencies for useEffect

  if (loading) return <div className="p-10 text-center text-xl">Loading...</div>;

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-5">My Car Inventory</h2>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="table w-full bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-4 text-left">Car Name</th>
              <th className="p-4 text-left">Rent Price</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Booked By</th>
            </tr>
          </thead>
          <tbody>
            {inventory.length > 0 ? (
              inventory.map((car) => (
                <tr key={car._id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={car.image} 
                        alt={car.carName}
                        className="w-12 h-10 rounded object-cover" 
                      />
                      <span className="font-semibold">{car.carName}</span>
                    </div>
                  </td>
                  <td className="p-4">${car.rentPrice}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      car.status === "Booked" 
                      ? 'bg-red-100 text-red-600' 
                      : 'bg-green-100 text-green-600'
                    }`}>
                      {car.status}
                    </span>
                  </td>
                  <td className="p-4 text-blue-600 text-sm font-medium">
                    {car.bookedBy || "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-10 text-center text-red-500 font-medium">
                  No cars found for: {user?.email}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAllCars;