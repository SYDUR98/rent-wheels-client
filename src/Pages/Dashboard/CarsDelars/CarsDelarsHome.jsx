import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth"; // Import useAuth to get user email
import LoadingPage from "../../../Coponents/Shared/LoadingPage";

const CarsDealerHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth(); // Get current logged-in user

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["dealer-stats", user?.email], // Include email in queryKey for safety
    queryFn: async () => {
      // Pass the email as a query parameter to match backend requirements
      // axiosSecure will automatically add the Authorization header
      const res = await axiosSecure.get(`/dealer/stats?email=${user?.email}`); 
      return res.data;
    },
    enabled: !!user?.email, // Only run the query if user email exists
  });

  if (isLoading) return <LoadingPage />;

  const {
    totalCars = 0,
    bookedCars = 0,
    availableCars = 0,
    totalBookings = 0,
  } = stats;

  return (
    <div className="p-6 bg-base-100">
      <h2 className="text-3xl font-bold text-center mb-6 text-primary">
        Cars Dealer Dashboard
      </h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stat bg-base-200 border border-base-300 shadow-xl rounded-xl p-4">
          <div className="stat-title text-neutral">Total Cars</div>
          <div className="stat-value text-secondary">{totalCars}</div>
        </div>

        <div className="stat bg-base-200 border border-base-300 shadow-xl rounded-xl p-4">
          <div className="stat-title text-neutral">Booked Cars</div>
          <div className="stat-value text-warning">{bookedCars}</div>
        </div>

        <div className="stat bg-base-200 border border-base-300 shadow-xl rounded-xl p-4">
          <div className="stat-title text-neutral">Available Cars</div>
          <div className="stat-value text-success">{availableCars}</div>
        </div>

        <div className="stat bg-base-200 border border-base-300 shadow-xl rounded-xl p-4">
          <div className="stat-title text-neutral">Total Bookings</div>
          <div className="stat-value text-accent">{totalBookings}</div>
        </div>
      </div>
    </div>
  );
};

export default CarsDealerHome;