import { use, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { AuthContext } from "../../provider/AuthContext";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const FeaturedCars = () => {
  const { user } = use(AuthContext);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://rent-wheels-unique-api-server.vercel.app/cars")
      .then((res) => {
        setCars(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

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
    /* Added bg-base-100 and text-base-content to ensure background and text switch correctly */
    <div className="bg-base-100 text-base-content transition-colors duration-300 pb-12">
      
      <h2 className="text-4xl font-bold text-center text-primary mt-12 pt-8">
        Newest Cars
      </h2>

      <div className="px-6 md:px-20 py-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        {cars.map((car) => (
          <div
            key={car._id}
            /* Using border-base-300 instead of a fixed border to look better in dark mode */
            className="border border-base-300 bg-base-100 rounded-lg shadow-md overflow-hidden relative"
          >
            {/* Status Badge - Using DaisyUI semantic colors */}
            <span
              className={`absolute top-2 right-2 px-3 py-1 text-xs font-semibold rounded-full z-10 ${
                car.status === "Booked"
                  ? "bg-error text-error-content" 
                  : "bg-success text-success-content"
              }`}
            >
              {car.status === "Booked" ? "Booked" : "Available"}
            </span>

            {/* Car Image */}
            <img
              src={car.image}
              alt={car.carName}
              className="w-full h-48 object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
              data-tooltip-id={`car-${car._id}`}
              data-tooltip-content={`${car.carName} | $${car.rentPrice} / day`}
            />

            <Tooltip id={`car-${car._id}`} place="top" effect="solid" />

            <div className="p-4">
              <h3 className="text-lg font-bold">{car.carName}</h3>
              
              {/* Changed from base-200 (fixed) to base-content with opacity for subtitles */}
              <p className="text-base-content/70">{car.category}</p>
              <p className="text-base-content/50 mt-1">{car.description}</p>
              <p className="font-semibold text-primary">${car.rentPrice} / day</p>
              
              {/* Changed from base-300 to base-content/60 */}
              <p className="text-base-content/60 text-sm">Provider: {car.providerName}</p>

              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => handleBookNow(car)}
                  disabled={car.status === "Booked"}
                  /* Button adapts color based on theme and status */
                  className={`flex-1 btn border-none text-white font-semibold rounded-lg transition duration-200 ${
                    car.status === "Booked"
                      ? "btn-disabled bg-base-300"
                      : "bg-primary hover:opacity-90"
                  }`}
                >
                  {car.status === "Booked" ? "Booked" : "Book Now"}
                </button>

                <Link
                  to={`/cars/${car._id}`}
                  className="flex-1 btn btn-outline btn-info px-4 py-2 font-semibold rounded-lg transition duration-200 hover:opacity-90 hover:text-white"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center mb-10">
        <Link
          to={"/browsecar"}
          className="btn btn-outline btn-info hover:text-white px-10"
        >
          Show All
        </Link>
      </div>
    </div>
  );
};

export default FeaturedCars;