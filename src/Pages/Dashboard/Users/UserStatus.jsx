import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure"; // Import your custom hook

const UserStatus = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure(); // Use axiosSecure instead of regular axios
  
  const [data, setData] = useState({ user: {}, myBookings: [], myCars: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait for auth to finish and check for user email
    if (authLoading || !user?.email) return;

    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Use axiosSecure to automatically include the Authorization header
        const res = await axiosSecure.get(`/user-dashboard/${user.email}`);
        setData(res.data);
      } catch (err) {
        // Error is handled by axiosSecure interceptors (e.g., logout on 401/403)
        console.error("Dashboard Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user?.email, authLoading, axiosSecure]);

  const handleUnbook = async (bookingId) => {
    if (!window.confirm("Are you sure to unbook?")) return;
    try {
      await axiosSecure.delete(`/bookings/${bookingId}`);
      setData((prev) => ({
        ...prev,
        myBookings: prev.myBookings.filter((b) => b._id !== bookingId),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCar = async (carId) => {
    if (!window.confirm("Are you sure to delete this car?")) return;
    try {
      await axiosSecure.delete(`/cars/${carId}`);
      setData((prev) => ({
        ...prev,
        myCars: prev.myCars.filter((c) => c._id !== carId),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Profile Info */}
      <div className="flex items-center gap-6 bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <img
          src={data.user?.image || "https://via.placeholder.com/150"}
          alt="profile"
          className="w-24 h-24 rounded-full border-4 border-blue-50"
        />
        <div>
          <h2 className="font-bold text-2xl text-gray-800">{data.user?.name}</h2>
          <p className="text-gray-500">{data.user?.email}</p>
          <div className="mt-2">
            <span className="text-xs uppercase font-bold bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
              {data.user?.role}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bookings Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="font-bold text-lg mb-4 text-blue-700 border-b pb-2">
            My Bookings ({data.myBookings?.length || 0})
          </h3>
          {data.myBookings?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th className="p-3">Car</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.myBookings.map((b) => (
                    <tr key={b._id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{b.carName}</td>
                      <td className="p-3 font-bold">${b.rentPrice}</td>
                      <td className="p-3">
                        <button
                          className="bg-red-500 text-white px-4 py-1.5 rounded text-sm"
                          onClick={() => handleUnbook(b._id)}
                        >
                          Unbook
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : <p className="text-gray-400">No bookings found.</p>}
        </div>

        {/* Listings Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="font-bold text-lg mb-4 text-indigo-700 border-b pb-2">
            My Cars ({data.myCars?.length || 0})
          </h3>
          {data.myCars?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th className="p-3">Car</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.myCars.map((c) => (
                    <tr key={c._id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{c.carName}</td>
                      <td className="p-3">
                        <span className="badge badge-ghost text-xs uppercase">{c.status || "Available"}</span>
                      </td>
                      <td className="p-3">
                        <button
                          className="bg-gray-800 text-white px-4 py-1.5 rounded text-sm"
                          onClick={() => handleDeleteCar(c._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : <p className="text-gray-400">No cars listed.</p>}
        </div>
      </div>
    </div>
  );
};

export default UserStatus;