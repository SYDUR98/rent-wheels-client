import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaBookmark, FaCar, FaTrashAlt, FaTimesCircle, FaChartLine } from "react-icons/fa";

const UserStatus = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [data, setData] = useState({ user: {}, myBookings: [], myCars: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading || !user?.email) return;

    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get(`/user-dashboard/${user.email}`);
        setData(res.data);
      } catch (err) {
        console.error("Dashboard Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user?.email, authLoading, axiosSecure]);

  // SweetAlert Theme Helper
  const swalConfig = {
    background: document.documentElement.getAttribute("data-theme") === "dark" ? "#1d232a" : "#fff",
    color: document.documentElement.getAttribute("data-theme") === "dark" ? "#A6ADBB" : "#1f2937",
  };

  const handleUnbook = async (bookingId) => {
    Swal.fire({
      ...swalConfig,
      title: "Are you sure?",
      text: "Do you want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#3b82f6",
      confirmButtonText: "Yes, Unbook!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/bookings/${bookingId}`);
          setData((prev) => ({
            ...prev,
            myBookings: prev.myBookings.filter((b) => b._id !== bookingId),
          }));
          Swal.fire({ ...swalConfig, title: "Cancelled!", icon: "success" });
        } catch (err) {
          Swal.fire({ ...swalConfig, title: "Error", text: "Could not cancel.", icon: "error" });
        }
      }
    });
  };

  const handleDeleteCar = async (carId) => {
    Swal.fire({
      ...swalConfig,
      title: "Delete Listing?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#3b82f6",
      confirmButtonText: "Yes, Delete!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/cars/${carId}`);
          setData((prev) => ({
            ...prev,
            myCars: prev.myCars.filter((c) => c._id !== carId),
          }));
          Swal.fire({ ...swalConfig, title: "Deleted!", icon: "success" });
        } catch (err) {
          Swal.fire({ ...swalConfig, title: "Error", text: "Failed to delete.", icon: "error" });
        }
      }
    });
  };

  if (authLoading || loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[400px] bg-base-100 transition-colors">
        <span className="loading loading-infinity loading-lg text-primary"></span>
        <p className="mt-4 text-primary font-bold animate-pulse">Syncing Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="w-full p-4 md:p-8 space-y-10 bg-base-100 min-h-screen transition-colors duration-300">
      
      {/* Dashboard Title */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black tracking-tighter uppercase inline-block border-b-4 border-primary pb-2">
          User <span className="text-primary">Dashboard</span>
        </h1>
        <p className="text-base-content/60 mt-2 font-medium">Manage your activities and listings</p>
      </div>

      {/* --- Statistics Section (Dark Mode Enhanced) --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="stats shadow bg-base-200 border border-base-300">
          <div className="stat">
            <div className="stat-figure text-primary text-3xl"><FaBookmark /></div>
            <div className="stat-title text-base-content/70">Total Bookings</div>
            <div className="stat-value text-primary">{data.myBookings?.length || 0}</div>
          </div>
        </div>
        <div className="stats shadow bg-base-200 border border-base-300">
          <div className="stat">
            <div className="stat-figure text-secondary text-3xl"><FaCar /></div>
            <div className="stat-title text-base-content/70">My Listings</div>
            <div className="stat-value text-secondary">{data.myCars?.length || 0}</div>
          </div>
        </div>
        <div className="stats shadow bg-primary text-primary-content">
          <div className="stat">
            <div className="stat-figure text-3xl"><FaChartLine /></div>
            <div className="stat-title opacity-80">Activity Rate</div>
            <div className="stat-value">High</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* --- Bookings Table --- */}
        <div className="bg-base-100 rounded-3xl shadow-2xl border border-base-300 overflow-hidden transition-all hover:shadow-primary/5">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-5 flex items-center justify-between text-white">
            <h3 className="font-bold text-xl flex items-center gap-3">
              <FaBookmark /> Active Bookings
            </h3>
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-black">
              LIVE
            </span>
          </div>
          <div className="p-2 md:p-6">
            {data.myBookings?.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr className="text-base-content/50 border-b border-base-300 uppercase text-xs">
                      <th>Vehicle</th>
                      <th>Price</th>
                      <th className="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-base-300/30">
                    {data.myBookings.map((b) => (
                      <tr key={b._id} className="hover:bg-base-200/50 transition-colors group">
                        <td>
                            <div className="font-bold group-hover:text-primary transition-colors">{b.carName}</div>
                            <div className="text-[10px] opacity-50 uppercase tracking-widest">{b._id.slice(-6)}</div>
                        </td>
                        <td className="font-black text-primary">${b.rentPrice}</td>
                        <td className="text-right">
                          <button
                            className="btn btn-ghost btn-circle text-error hover:bg-error/10"
                            onClick={() => handleUnbook(b._id)}
                            title="Cancel Booking"
                          >
                            <FaTimesCircle className="text-lg" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-16 opacity-40 italic">No active bookings found.</div>
            )}
          </div>
        </div>

        {/* --- Listings Table --- */}
        <div className="bg-base-100 rounded-3xl shadow-2xl border border-base-300 overflow-hidden transition-all hover:shadow-secondary/5">
          <div className="bg-gradient-to-r from-indigo-700 to-purple-700 p-5 flex items-center justify-between text-white">
            <h3 className="font-bold text-xl flex items-center gap-3">
              <FaCar /> My Listings
            </h3>
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-black">MANAGEMENT</span>
          </div>
          <div className="p-2 md:p-6">
            {data.myCars?.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr className="text-base-content/50 border-b border-base-300 uppercase text-xs">
                      <th>Car Name</th>
                      <th>Status</th>
                      <th className="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-base-300/30">
                    {data.myCars.map((c) => (
                      <tr key={c._id} className="hover:bg-base-200/50 transition-colors">
                        <td className="font-bold">{c.carName}</td>
                        <td>
                          <span className={`badge badge-sm font-bold ${
                              c.status === "Available" ? "badge-success" : "badge-warning"
                            } transition-all`}>
                            {c.status || "Available"}
                          </span>
                        </td>
                        <td className="text-right">
                          <button
                            className="btn btn-ghost btn-circle text-error hover:bg-error/10"
                            onClick={() => handleDeleteCar(c._id)}
                          >
                            <FaTrashAlt />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-16 opacity-40 italic">You haven't listed any cars yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStatus;