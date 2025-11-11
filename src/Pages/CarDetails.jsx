
import React from 'react';

import { useLoaderData,} from "react-router";

const CarDetails = () => {
  const car = useLoaderData()
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
    status 
  } = car;

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
        <h3 className="text-xl font-semibold border-b pb-2 ">Car Specifications</h3>
        
        <p className="text-lg"><strong>Category:</strong> <span className="text-gray-700">{category}</span></p>
        
        <p className="text-lg">
          <strong>Rent Price:</strong> 
          
          <span className="text-2xl font-extrabold text-primary"> 
            ${rentPrice}
          </span> / day
        </p>
        
        <p className="text-lg"><strong>Location:</strong> <span className="text-accent">{location}</span></p>
        
        <p className="text-lg"><strong>Provider:</strong> <span className="text-accent">{providerName}</span></p>
        
        <p className="text-lg">
          <strong>Status:</strong> 
          <span className={`font-semibold ${status === 'Available' ? 'text-success-content' : 'text-warning-content'}`}>
            {status}
          </span>
        </p>
      </div>

      {/*  Buttons */}
      <div className="mt-8 flex gap-4">
        {/* Book Now Button - BACKGROUND: bg-primary */}
        <button
          onClick={() => console.log(`Attempting to book ${carName}`)}
          className="flex-1 px-6 py-3 text-white font-semibold rounded-lg transition duration-200 hover:opacity-90 bg-primary"
        >
          Book Now
        </button>

        <button
          onClick={() => console.log(`Navigating to listings by ${providerName}`)}
          className="flex-1 px-6 py-3 font-semibold rounded-lg border-2 border-primary transition duration-200 hover:bg-gray-100  text-accent"
        >
          View Provider's Listings
        </button>
      </div>
    </div>
  );
};

export default CarDetails;
