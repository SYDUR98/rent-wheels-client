// src/pages/dashboard/admin/AdminHome.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";
import LoadingPage from "../../../Coponents/Shared/LoadingPage";

// ChartJS Register
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Month names for Line chart
const monthNames = [
  "", "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"
];

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/stats");
      return res.data;
    },
  });

  if (isLoading) return <LoadingPage />;

  const {
    totalUsers = 0,
    totalCars = 0,
    totalBookings = 0,
    bookedCars = 0,
    availableCars = 0,
    paymentsOverTime = [],
    carsByStatus = {},
  } = stats;

  // Line Chart: Revenue over time
  const lineChartData = {
    labels: paymentsOverTime.map((p) => `${monthNames[p.month]}-${p.year}`),
    datasets: [
      {
        label: "Revenue Over Time (৳)",
        data: paymentsOverTime.map((p) => p.amount),
        borderColor: "rgba(59, 130, 246, 1)",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  // Pie chart: Cars status distribution
  const pieChartData = {
    labels: ["Booked", "Available"],
    datasets: [
      {
        data: [carsByStatus.booked || 0, carsByStatus.available || 0],
        backgroundColor: ["rgba(239, 68, 68, 0.7)", "rgba(34, 197, 94, 0.7)"],
      },
    ],
  };

  // Bar chart: Total users vs total bookings
  const barChartData = {
    labels: ["Users", "Bookings"],
    datasets: [
      {
        label: "Count",
        data: [totalUsers, totalBookings],
        backgroundColor: ["rgba(59, 130, 246, 0.7)", "rgba(251, 191, 36, 0.7)"],
      },
    ],
  };

  return (
    <div className="p-6 bg-base-100">
      <h2 className="text-3xl font-bold text-center mb-6 text-primary">
        ADMIN DASHBOARD
      </h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="stat bg-base-200 border border-base-300 shadow-xl rounded-xl p-4">
          <div className="stat-title text-neutral">Total Users</div>
          <div className="stat-value text-primary">{totalUsers}</div>
        </div>

        <div className="stat bg-base-200 border border-base-300 shadow-xl rounded-xl p-4">
          <div className="stat-title text-neutral">Total Cars</div>
          <div className="stat-value text-secondary">{totalCars}</div>
        </div>

        <div className="stat bg-base-200 border border-base-300 shadow-xl rounded-xl p-4">
          <div className="stat-title text-neutral">Total Bookings</div>
          <div className="stat-value text-accent">{totalBookings}</div>
        </div>

        <div className="stat bg-base-200 border border-base-300 shadow-xl rounded-xl p-4">
          <div className="stat-title text-neutral">Booked Cars</div>
          <div className="stat-value text-warning">{bookedCars}</div>
        </div>

        <div className="stat bg-base-200 border border-base-300 shadow-xl rounded-xl p-4">
          <div className="stat-title text-neutral">Available Cars</div>
          <div className="stat-value text-success">{availableCars}</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-base-200 p-4 rounded-xl shadow-xl">
          <h3 className="font-bold text-lg mb-3 text-neutral">
            Revenue Over Last 6 Months
          </h3>
          <Line data={lineChartData} />
        </div>

        <div className="bg-base-200 p-4 rounded-xl shadow-xl">
          <h3 className="font-bold text-lg mb-3 text-neutral">
            Cars Status Distribution
          </h3>
          <Pie data={pieChartData} />
        </div>

        <div className="bg-base-200 p-4 rounded-xl shadow-xl">
          <h3 className="font-bold text-lg mb-3 text-neutral">Users vs Bookings</h3>
          <Bar data={barChartData} />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
