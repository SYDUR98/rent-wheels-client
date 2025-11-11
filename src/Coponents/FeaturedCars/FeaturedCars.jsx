import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";


const FeaturedCars = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/cars")
      .then(res => setCars(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
   <div>
      <div className="px-20 grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {cars.map((car) => (
        <div
          key={car._id}
          className="border rounded-lg shadow-md overflow-hidden"
        >
          <img
            src={car.image}
            alt={car.carName}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-bold">{car.carName}</h3>
            <p className="text-base-300">{car.category}</p>
            <p className=" font-semibold">
              ${car.rentPrice} / day
            </p>
            <p className="text-gray-500">Provider: {car.providerName}</p>
            
            <div className="mt-8 flex gap-6">
              {/* Book Now Button */}

              <Link className="flex-1 btn btn-primary  px-6 py-3 text-white font-semibold rounded-lg transition duration-200 hover:opacity-90 bg-primary">
                Book Now
              </Link>
              <Link
              to={`/cars/${car._id}`}
             className="flex-1 btn btn-outline btn-info  px-6 py-3  font-semibold rounded-lg transition duration-200 hover:opacity-90 hover:text-white"
            >
              View Details
            </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="flex justify-center items-center">
      <Link to={'/browsecar'}
      className="btn btn-outline btn-info hover:text-white "
      >Show All</Link>
    </div>
   </div>
  );
};

export default FeaturedCars;
