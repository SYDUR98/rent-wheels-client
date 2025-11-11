import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";


const BrowseCars = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/browsecars")
      .then(res => setCars(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="px-20 grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {cars.map(car => (
        <div key={car._id} className="border rounded-lg shadow-md overflow-hidden">
          <img src={car.image} alt={car.carName} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-bold">{car.carName}</h3>
            <p className="text-gray-600">{car.category}</p>
            <p className="text-blue-600 font-semibold">${car.rentPrice} / day</p>
            <p className="text-gray-500">Provider: {car.providerName}</p>
            <Link
              to={`/car/${car._id}`} 
              className="mt-2 inline-block px-4 py-2 bg-[#4D9ED0] text-white rounded hover:bg-[#357ABD]"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BrowseCars;
