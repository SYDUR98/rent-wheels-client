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
      .get("https://rent-wheels-unique-api-server.vercel.app/browsecar")
      .then((res) => {
        setCars(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
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
    /* Main wrapper with dynamic background and text */
    <div className="bg-base-100 text-base-content min-h-screen transition-colors duration-300 pb-10">
      <h2 className="text-4xl font-bold text-center pt-12 text-primary">
        Cars
      </h2>
      <div className="px-6 md:px-20 py-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        {cars.map((car) => (
          <div
            key={car._id}
            /* Dynamic border and card background */
            className="border border-base-300 bg-base-100 rounded-lg shadow-md overflow-hidden relative"
          >
            {/* Status Badge using error/success semantic colors */}
            <span
              className={`absolute top-2 right-2 px-3 py-1 text-xs font-semibold rounded-full z-10 ${
                car.status === "Booked"
                  ? "bg-error text-error-content"
                  : "bg-success text-success-content"
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

            <Tooltip id={`car-${car._id}`} place="top" effect="solid" />

            <div className="p-4">
              <h3 className="text-lg font-bold">{car.carName}</h3>
              
              {/* text-base-content/70 adjusts based on theme */}
              <p className="text-base-content/70">{car.category}</p>
              
              <p className="text-base-content/50 mt-1">{car.description}</p>
              <p className="font-semibold text-primary mt-1">${car.rentPrice} / day</p>
              
              {/* text-base-content/60 for subtitle info */}
              <p className="text-base-content/60 text-sm">Provider: {car.providerName}</p>

              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => handleBookNow(car)}
                  disabled={car.status === "Booked"}
                  /* Button adapts to theme background when disabled */
                  className={`flex-1 btn text-white font-semibold rounded-lg transition duration-200 border-none ${
                    car.status === "Booked"
                      ? "btn-disabled bg-base-300"
                      : "bg-primary hover:opacity-90"
                  }`}
                >
                  {car.status === "Booked" ? "Booked" : "Book Now"}
                </button>

                <Link
                  to={`/cars/${car._id}`}
                  className="flex-1 btn btn-outline btn-info font-semibold rounded-lg transition duration-200 hover:opacity-90 hover:text-white"
                >
                  Details
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