import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingPage from '../../../Coponents/Shared/LoadingPage';



const MyAllCars = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchInventory = async () => {
      if (!user?.email) return;

      try {
        setLoading(true);
        const res = await axiosSecure.get(`/dealer-inventory?email=${user?.email}`);
        setInventory(res.data);
      } catch (err) {
        console.error("Error fetching inventory", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [user?.email, axiosSecure]);

  if (loading) return <LoadingPage />;

  return (
    <div className="bg-base-100 min-h-screen p-4 md:p-8 transition-colors duration-300">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black tracking-tighter uppercase inline-block border-b-4 border-primary pb-2 text-base-content">
          Dealer <span className="text-primary">Inventory</span>
        </h1>
        <p className="text-base-content/60 mt-2 font-medium italic">Track your listed vehicles and their booking status</p>
      </div>

      {/* Table Container */}
      <div className="max-w-6xl mx-auto overflow-x-auto shadow-2xl rounded-2xl border border-base-300">
        <table className="table w-full bg-base-100">
          {/* Head */}
          <thead className="bg-base-200 text-base-content uppercase text-sm">
            <tr>
              <th className="p-5 font-bold">Vehicle Details</th>
              <th className="p-5 font-bold">Rent Price</th>
              <th className="p-5 font-bold">Status</th>
              <th className="p-5 font-bold">Booked By</th>
            </tr>
          </thead>
          
          {/* Body */}
          <tbody className="divide-y divide-base-300">
            {inventory.length > 0 ? (
              inventory.map((car) => (
                <tr key={car._id} className="hover:bg-base-200/50 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="avatar">
                        <div className="mask mask-squircle w-16 h-12">
                          <img 
                            src={car.image} 
                            alt={car.carName}
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-black text-base-content group-hover:text-primary transition-colors">
                          {car.carName}
                        </div>
                        <div className="text-xs opacity-50 uppercase tracking-tighter">ID: {car._id.slice(-6)}</div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="p-4 font-bold text-primary text-lg">
                    ${car.rentPrice}<span className="text-xs text-base-content/50">/day</span>
                  </td>
                  
                  <td className="p-4">
                    <span className={`badge badge-md font-bold border-none py-3 px-4 ${
                      car.status === "Booked" 
                      ? 'bg-error/10 text-error' 
                      : 'bg-success/10 text-success'
                    }`}>
                      {car.status === "Booked" ? "🔴 Booked" : "🟢 Available"}
                    </span>
                  </td>
                  
                  <td className="p-4">
                    {car.bookedBy ? (
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-primary underline decoration-dotted">
                          {car.bookedBy}
                        </span>
                        <span className="text-[10px] opacity-50 italic">Verified Client</span>
                      </div>
                    ) : (
                      <span className="badge badge-ghost badge-sm opacity-50">N/A</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-20 text-center">
                   <div className="flex flex-col items-center gap-2">
                      <span className="text-5xl opacity-20">🚗</span>
                      <p className="text-error font-bold text-lg">No cars found in your inventory!</p>
                      <p className="text-base-content/50 text-sm italic">{user?.email}</p>
                   </div>
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