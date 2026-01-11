import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router";
import { AuthContext } from "../../provider/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure"; // Match BrowseCars logic
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import LoadingPage from "../Shared/LoadingPage";

const FeaturedCars = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure(); // Secure connection for bookings

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetching Top 6 Featured Cars (Public Route)
  useEffect(() => {
    const fetchFeaturedCars = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("https://rent-wheels-unique-api-server.vercel.app/cars");
        setCars(data);
      } catch (err) {
        console.error("Fetch Error:", err);
        toast.error("Failed to load featured cars");
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedCars();
  }, []);

  // 2. Handle Booking Action (Using axiosSecure like BrowseCars)
  const handleBookNow = async (car) => {
    if (!user) return toast.error("Please login first to book a car!");

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

    const loadingToast = toast.loading("Processing your booking...");

    try {
      // axiosSecure automatically handles the Bearer Token
      const { data } = await axiosSecure.post("/bookings", bookingData);

      if (data.insertedId) {
        // Optimistically update UI
        setCars((prevCars) =>
          prevCars.map((c) =>
            c._id === car._id ? { ...c, status: "Booked" } : c
          )
        );
        toast.update(loadingToast, { render: "Booking successful!", type: "success", isLoading: false, autoClose: 3000 });
      }
    } catch (err) {
      console.error(err);
      toast.update(loadingToast, { 
        render: err.response?.data?.message || "Failed to book car", 
        type: "error", 
        isLoading: false, 
        autoClose: 3000 
      });
    }
  };

  if (loading) return <LoadingPage></LoadingPage>;

  return (
    <div className="bg-base-100 text-base-content transition-colors duration-300 pb-16">
      {/* --- TITLE SECTION --- */}
      <div className="text-center mt-12 pt-8">
        <h2 className="text-4xl font-extrabold tracking-tighter uppercase inline-block">
          Newest <span className="text-primary border-b-4 border-primary">Arrivals</span>
        </h2>
        <p className="text-base-content/60 mt-3 italic tracking-wide">
          Handpicked premium rides for your next journey
        </p>
      </div>

      {/* --- CAR GRID --- */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {cars.map((car) => (
          <div
            key={car._id}
            className="group border border-base-300 bg-base-100 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden relative flex flex-col"
          >
            {/* Status Badge */}
            <div className="absolute top-4 right-4 z-10">
              <span
                className={`px-3 py-1 text-[10px] font-bold uppercase rounded-full shadow-md backdrop-blur-sm ${
                  car.status === "Booked"
                    ? "bg-error/90 text-white"
                    : "bg-success/90 text-white"
                }`}
              >
                {car.status}
              </span>
            </div>

            {/* Car Image with Hover Effect */}
            <div className="overflow-hidden h-52">
              <img
                src={car.image}
                alt={car.carName}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                data-tooltip-id={`car-${car._id}`}
                data-tooltip-content={`${car.carName} | $${car.rentPrice}/day`}
              />
            </div>
            <Tooltip id={`car-${car._id}`} place="top" className="z-50 rounded-lg" />

            {/* Car Details */}
            <div className="p-6 flex-grow flex flex-col">
              <div className="mb-3">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold truncate group-hover:text-primary transition-colors">
                    {car.carName}
                  </h3>
                </div>
                <p className="text-xs font-semibold text-primary uppercase tracking-[0.1em] mt-1">
                  {car.category} • {car.location || "Available Now"}
                </p>
              </div>

              <p className="text-sm text-base-content/70 line-clamp-2 mb-5 flex-grow italic">
                {car.description || "Experience comfort and style with our top-tier rental collection."}
              </p>

              <div className="flex items-end justify-between mb-6">
                <div>
                  <span className="text-2xl font-black text-base-content">${car.rentPrice}</span>
                  <span className="text-sm font-medium opacity-60">/day</span>
                </div>
                <p className="text-[10px] text-base-content/40 font-bold uppercase tracking-tighter">
                   Dealer: {car.providerName || "Official"}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleBookNow(car)}
                  disabled={car.status === "Booked"}
                  className={`flex-[2] btn btn-md border-none rounded-xl font-bold transition-all duration-300 active:scale-95 ${
                    car.status === "Booked"
                      ? "btn-disabled bg-base-300"
                      : "bg-primary text-primary-content hover:bg-primary/90 shadow-lg shadow-primary/20"
                  }`}
                >
                  {car.status === "Booked" ? "Booked" : "Book Now"}
                </button>

                <Link
                  to={`/cars/${car._id}`}
                  className="flex-1 btn btn-md btn-outline btn-primary rounded-xl font-bold hover:shadow-lg"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- EXPLORE ALL BUTTON --- */}
      <div className="flex justify-center mt-8">
        <Link
          to={"/browsecar"}
          className="btn btn-wide btn-outline btn-primary rounded-full font-bold hover:bg-primary hover:text-white transition-all duration-500 shadow-md"
        >
          View All Vehicles
        </Link>
      </div>
    </div>
  );
};

export default FeaturedCars;