import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../provider/AuthContext";
import { Link } from "react-router";
import { Tooltip } from "react-tooltip";
import { ToastContainer, toast } from "react-toastify";
import LoadingSpinner from "../../Coponents/LoadingSpinner/LoadingSpinner";

const BrowseCars = () => {
  const { user } = useContext(AuthContext);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/browsecar")
      .then((res) => {
        setCars(res.data)
        setLoading(false)
      })
      .catch((err) => console.error(err));
  }, []);

   if(loading){
      return <LoadingSpinner></LoadingSpinner>
      }

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

  // animate functionality

  return (
    <div>
      <h2 className="text-4xl font-bold text-center mt-12 text-primary">
          Cars
      </h2>
      <div className="px-6 md:px-20 py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {cars.map((car) => (
        <div
          key={car._id}
          className="border rounded-lg shadow-md overflow-hidden relative"
        >
          {/* Status Badge */}
          <span
            className={`absolute top-2 right-2 px-3 py-1 text-xs font-semibold rounded-full ${
              car.status === "Booked"
                ? "bg-warning-content text-white"
                : "bg-success-content text-white"
            }`}
          >
            {car.status === "Booked" ? "Booked" : "Available"}
          </span>

           <img
            src={car.image}
            alt={car.carName}
            className="w-full h-48 object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
            data-tooltip-id={`car-${car._id}`}
            data-tooltip-content={`${car.carName} | $${car.rentPrice} / day | ${car.status} `}
          />

          {/* Tooltip */}
          <Tooltip id={`car-${car._id}`} place="top" effect="solid" />

          <div className="p-4">
            <h3 className="text-lg font-bold">{car.carName}</h3>
            <p className="text-base-200">{car.category}</p>
            <p className="font-semibold">${car.rentPrice} / day</p>
            <p className="text-base-300">Provider: {car.providerName}</p>

            <div className="mt-4 flex gap-4">
              <button
                onClick={() => handleBookNow(car)}
                disabled={car.status === "Booked"}
                className={`flex-1 btn px-4 py-2 text-white font-semibold rounded-lg transition duration-200 ${
                  car.status === "Booked"
                    ? "bg-base-200 cursor-not-allowed"
                    : "bg-primary hover:opacity-90"
                }`}
              >
                {car.status === "Booked" ? "Booked" : "Book Now"}
              </button>

              <Link
                to={`/cars/${car._id}`}
                className="flex-1 btn btn-outline btn-info px-4 py-2 font-semibold rounded-lg transition duration-200 hover:opacity-90 hover:text-white"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      ))}
       <ToastContainer />
    </div>
    </div>
  );
};

export default BrowseCars;
