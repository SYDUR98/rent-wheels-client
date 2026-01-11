import React, { useContext, useState, useEffect } from "react";
import { Link, useLoaderData } from "react-router";
import { AuthContext } from "../provider/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { FaGasPump, FaUsers, FaCogs, FaCheckCircle, FaMapMarkerAlt } from "react-icons/fa";

const CarDetails = () => {
  const car = useLoaderData();
  const { user } = useContext(AuthContext);

  if (!car) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-100">
        <span className="loading loading-ring loading-lg text-primary"></span>
      </div>
    );
  }

  const {
    _id, carName, description, category, rentPrice,
    location, image, providerName, status,
    features = ["GPS", "Bluetooth", "AC", "Insurance Included"] // Default fallback
  } = car;

  const handleBookNow = async () => {
    if (!user) return toast.error("Please login first to book a car");

    const bookingData = {
      carId: _id,
      carName,
      category,
      rentPrice,
      userEmail: user.email,
      userName: user.displayName,
      image,
      location,
      bookingDate: new Date(),
      status: "Confirmed"
    };

    try {
      await axios.post("https://rent-wheels-unique-api-server.vercel.app/bookings", bookingData);
      toast.success("Booking successful! Check your dashboard.");
    } catch (err) {
      toast.error("Failed to book. Please try again.");
    }
  };

  return (
    <div className="bg-base-100 text-base-content min-h-screen py-10 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 lg:px-10">
        
        {/* Requirement: Sections include Overview & Media */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Left Side: Images Section */}
          <div className="space-y-4">
            <div className="overflow-hidden rounded-3xl border border-base-300 shadow-xl group">
              <img
                src={image}
                alt={carName}
                className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Requirement: Multiple images hint (Mocking thumbnails) */}
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-20 bg-base-200 rounded-xl border border-base-300 overflow-hidden cursor-pointer hover:border-primary">
                   <img src={image} className="w-full h-full object-cover opacity-60 hover:opacity-100" alt="thumbnail" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Key Info & Pricing */}
          <div className="flex flex-col">
            <div className="flex justify-between items-start">
              <div>
                <span className="badge badge-primary badge-outline font-bold px-4 py-3 mb-2">{category}</span>
                <h2 className="text-4xl font-black text-base-content tracking-tight mb-2">{carName}</h2>
                <div className="flex items-center gap-2 text-sm opacity-70">
                  <FaMapMarkerAlt className="text-primary" />
                  <span>{location}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-black text-primary">${rentPrice}</p>
                <p className="text-xs uppercase font-bold opacity-50">Per Day</p>
              </div>
            </div>

            <div className="divider my-6"></div>

            {/* Requirement: Overview/Description */}
            <div>
              <h3 className="text-xl font-bold mb-3 uppercase tracking-wider">Description</h3>
              <p className="text-base-content/70 leading-relaxed mb-6">
                {description || "No description available for this vehicle. Experience a smooth and comfortable ride with our top-rated car rental service."}
              </p>
            </div>

            {/* Requirement: Key Information/Specs */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-base-200 p-4 rounded-2xl flex flex-col items-center border border-base-300">
                <FaUsers className="text-primary text-xl mb-1" />
                <span className="text-xs font-bold opacity-60">5 Seats</span>
              </div>
              <div className="bg-base-200 p-4 rounded-2xl flex flex-col items-center border border-base-300">
                <FaGasPump className="text-primary text-xl mb-1" />
                <span className="text-xs font-bold opacity-60">Petrol</span>
              </div>
              <div className="bg-base-200 p-4 rounded-2xl flex flex-col items-center border border-base-300">
                <FaCogs className="text-primary text-xl mb-1" />
                <span className="text-xs font-bold opacity-60">Automatic</span>
              </div>
            </div>

            {/* Requirement: CTA Button */}
            <div className="mt-auto">
              <button
                onClick={handleBookNow}
                disabled={status === "Booked"}
                className={`w-full btn btn-lg rounded-2xl font-black transition-all ${
                  status === "Booked" 
                  ? "btn-disabled bg-base-300" 
                  : "btn-primary shadow-lg shadow-primary/30 hover:scale-[1.02]"
                }`}
              >
                {status === "Booked" ? "Currently Not Available" : "Book This Vehicle"}
              </button>
              <p className="text-center text-xs mt-4 opacity-50 flex items-center justify-center gap-2">
                <FaCheckCircle className="text-success" /> Free cancellation up to 24h before pick-up
              </p>
            </div>
          </div>
        </div>

        {/* Requirement: Features & Rules Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-base-200/50 p-8 rounded-3xl border border-base-300">
            <h3 className="text-2xl font-black mb-6 border-l-4 border-primary pl-4">Included Features</h3>
            <div className="grid grid-cols-2 gap-4">
              {features.map((f, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm font-medium">
                  <FaCheckCircle className="text-primary" /> {f}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-base-200/50 p-8 rounded-3xl border border-base-300">
            <h3 className="text-2xl font-black mb-6 border-l-4 border-primary pl-4">Rental Rules</h3>
            <ul className="space-y-3 text-sm opacity-80 list-disc pl-5">
              <li>Minimum age required is 21 years.</li>
              <li>Valid driving license and ID proof are mandatory.</li>
              <li>Security deposit of $200 at the time of pickup.</li>
              <li>Fuel policy: Full to Full.</li>
            </ul>
          </div>
        </div>

      </div>
      <ToastContainer theme="colored" />
    </div>
  );
};

export default CarDetails;