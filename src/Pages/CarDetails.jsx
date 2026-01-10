import React, { useContext, useState } from "react";
import { Link, useLoaderData } from "react-router";
import { AuthContext } from "../provider/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const CarDetails = () => {
  const car = useLoaderData();
  const { user } = useContext(AuthContext);
  const [cars, setCars] = useState([]);

  if (!car) {
    return <div className="flex justify-center items-center min-h-screen">
      <p className="text-center text-xl font-bold animate-pulse text-primary">Loading car details...</p>
    </div>;
  }

  const {
    _id,
    carName,
    description,
    category,
    rentPrice,
    location,
    image,
    providerName,
    status,
  } = car;

  const handleBookNow = async (car) => {
    if (!user) return toast.error("Please login first");

    const bookingData = {
      carId: car._id,
      carName: car.carName,
      category: car.category,
      rentPrice: car.rentPrice,
      userEmail: user.email,
      userName: user.displayName,
      image: car.image,
      location: car.location,
    };

    try {
      await axios.post("https://rent-wheels-unique-api-server.vercel.app/bookings", bookingData);

      
      setCars(
        cars.map((c) => (c._id === car._id ? { ...c, status: "Booked" } : c))
      );
      toast.success("Booking successful");
    } catch (err) {
      console.error(err);
      toast.error("Failed to book car");
    }
  };

  return (
    /* Changed bg-white to bg-base-100 and added text-base-content */
    <div className="bg-base-100 text-base-content min-h-screen py-10 transition-colors duration-300">
      <div className="max-w-3xl mx-auto p-6 bg-base-100 border border-base-300 shadow-2xl rounded-2xl">
        
        {/* Car Image with zoom effect */}
        <div className="overflow-hidden rounded-xl">
            <img
            src={image}
            alt={carName}
            className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
            />
        </div>

        <h2 className="text-4xl font-extrabold mt-6 text-primary">{carName}</h2>

        {/* Description - text-base-content/80 works best for readability */}
        <p className="mt-4 text-base-content/80 leading-relaxed text-lg">
            {description}
        </p>

        <div className="mt-8 space-y-4 bg-base-200 p-6 rounded-xl border border-base-300">
          <h3 className="text-2xl font-bold border-b border-primary/20 pb-2 text-primary">
            Car Specifications
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p className="text-lg">
                <span className="font-bold">Category:</span>{" "}
                <span className="text-base-content/70">{category}</span>
            </p>

            <p className="text-lg">
                <span className="font-bold">Location:</span>{" "}
                <span className="text-accent">{location}</span>
            </p>

            <p className="text-lg">
                <span className="font-bold">Provider:</span>{" "}
                <span className="text-accent">{providerName}</span>
            </p>

            <p className="text-lg">
                <span className="font-bold">Status:</span>{" "}
                <span
                    className={`font-bold px-3 py-1 rounded-full text-sm ${
                    status === "Available"
                        ? "bg-success/20 text-success"
                        : "bg-error/20 text-error"
                    }`}
                >
                    {status}
                </span>
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-primary/10">
            <p className="text-lg">
                <span className="font-bold">Rent Price:</span>{" "}
                <span className="text-3xl font-black text-primary">
                ${rentPrice}
                </span>{" "}
                <span className="text-sm opacity-60">/ per day</span>
            </p>
          </div>
        </div>

        {/* Button Section */}
        <div className="mt-8">
          <button
            onClick={() => handleBookNow(car)}
            disabled={status === "Booked"}
            className={`w-full btn text-lg font-bold h-14 rounded-xl transition-all duration-300 shadow-lg ${
              status === "Booked"
                ? "btn-disabled bg-base-300 text-base-content/30"
                : "bg-primary hover:bg-primary/90 text-white hover:shadow-primary/30"
            }`}
          >
            {status === "Booked" ? "Currently Booked" : "Confirm Booking Now"}
          </button>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default CarDetails;