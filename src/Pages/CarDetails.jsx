import React, { useContext, useState } from "react";
import { Link, useLoaderData } from "react-router";
import { AuthContext } from "../provider/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const CarDetails = () => {
  const car = useLoaderData();
  const { user } = useContext(AuthContext);
  const [cars, setCars] = useState([]);

  // console.log(car)

  if (!car) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  const {
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
    if (!user) return alert("Please login first");
   

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
      await axios.post("http://localhost:3000/bookings", bookingData);

      // update UI instantly
      setCars(
        cars.map((c) => (c._id === car._id ? { ...c, status: "Booked" } : c))
      );
      toast.success("Booking successful");
    } catch (err) {
      console.error(err);
      alert("Failed to book car");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      {/* Car Image */}
      <img
        src={image}
        alt={carName}
        className="w-full h-64 object-cover rounded-md"
      />

      <h2 className="text-3xl font-bold mt-4">{carName}</h2>

      {/* Description */}
      <p className=" mt-2">{description}</p>

      <div className="mt-6 space-y-3">
        <h3 className="text-xl font-semibold border-b pb-2 ">
          Car Specifications
        </h3>

        <p className="text-lg">
          <strong>Category:</strong>{" "}
          <span className="text-base-300">{category}</span>
        </p>

        <p className="text-lg">
          <strong>Rent Price:</strong>
          <span className="text-2xl font-extrabold text-primary">
            ${rentPrice}
          </span>{" "}
          / day
        </p>

        <p className="text-lg">
          <strong>Location:</strong>{" "}
          <span className="text-accent">{location}</span>
        </p>

        <p className="text-lg">
          <strong>Provider:</strong>{" "}
          <span className="text-accent">{providerName}</span>
        </p>

        <p className="text-lg">
          <strong>Status:</strong>
          <span
            className={`font-semibold ${
              status === "Available"
                ? "text-success-content"
                : "text-warning-content"
            }`}
          >
            {status}
          </span>
        </p>
      </div>

      {/*  Button */}
      <div className="mt-8 flex">
        {/* Book Now Button */}

        <Link
          onClick={() => handleBookNow(car)}
          disabled={car.status === "Booked"}
          className={`flex-1 btn px-4 py-2 text-white font-semibold rounded-lg transition duration-200 ${
            car.status === "Booked"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary hover:opacity-90"
          }`}
        >
          {car.status === "Booked" ? "Booked" : "Book Now"}
        </Link>
      </div>
       <ToastContainer />
    </div>
  );
};

export default CarDetails;
