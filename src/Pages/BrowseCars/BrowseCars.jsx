import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../provider/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure"; // Using for secure booking
import { Link } from "react-router";
import { Tooltip } from "react-tooltip";
import { ToastContainer, toast } from "react-toastify";
import LoadingSpinner from "../../Coponents/LoadingSpinner/LoadingSpinner";

const BrowseCars = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  // State Management
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Search and Filter States
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch data whenever filters or page changes
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        // Using public axios for browsing
        const { data } = await axios.get(
          `https://rent-wheels-unique-api-server.vercel.app/browsecar?search=${search}&category=${category}&sort=${sort}&page=${page}&limit=8`
        );
        setCars(data.cars);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.error("Fetch Error:", err);
        toast.error("Failed to load cars");
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, [search, category, sort, page]);

  // Handle Booking Action
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
      // Using axiosSecure to send Token
      await axiosSecure.post("/bookings", bookingData);
      
      // Update local state to reflect booking
      setCars(cars.map((c) => (c._id === car._id ? { ...c, status: "Booked" } : c)));
      toast.success("Booking successful!");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to book car");
    }
  };

  return (
    <div className="bg-base-100 text-base-content min-h-screen pb-10">
      <h2 className="text-4xl font-bold text-center pt-12 text-primary">Explore Cars</h2>

      {/* --- SEARCH & FILTER SECTION --- */}
      <div className="container mx-auto px-6 mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by name..."
          className="input input-bordered w-full"
          onChange={(e) => {setSearch(e.target.value); setPage(1);}}
        />

        {/* Category Filter */}
        <select 
          className="select select-bordered w-full" 
          onChange={(e) => {setCategory(e.target.value); setPage(1);}}
        >
          <option value="">All Categories</option>
          <option value="Sedan">Sedan</option>
          <option value="SUV">SUV</option>
          <option value="Luxury">Luxury</option>
          <option value="Electric">Electric</option>
        </select>

        {/* Sorting */}
        <select 
          className="select select-bordered w-full" 
          onChange={(e) => {setSort(e.target.value); setPage(1);}}
        >
          <option value="">Sort By (Newest)</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
        </select>

        <button className="btn btn-primary" onClick={() => {setSearch(""); setCategory(""); setSort(""); setPage(1);}}>
            Reset Filters
        </button>
      </div>

      {/* --- CONTENT SECTION --- */}
      <div className="container mx-auto px-6 py-10">
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <LoadingSpinner />
          </div>
        ) : cars.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl text-error font-semibold">No cars found matching your criteria.</h3>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {cars.map((car) => (
                <div key={car._id} className="border border-base-300 bg-base-100 rounded-lg shadow-md overflow-hidden relative flex flex-col">
                  {/* Status Badge */}
                  <span className={`absolute top-2 right-2 px-3 py-1 text-xs font-semibold rounded-full z-10 ${
                    car.status === "Booked" ? "bg-error text-white" : "bg-success text-white"
                  }`}>
                    {car.status}
                  </span>

                  <img
                    src={car.image}
                    alt={car.carName}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    data-tooltip-id={`car-${car._id}`}
                    data-tooltip-content={`${car.carName} | $${car.rentPrice}/day`}
                  />
                  <Tooltip id={`car-${car._id}`} />

                  <div className="p-4 flex-grow flex flex-col">
                    <h3 className="text-lg font-bold">{car.carName}</h3>
                    <p className="text-base-content/70 text-sm mb-2">{car.category} • {car.location}</p>
                    <p className="text-base-content/60 text-xs line-clamp-2 flex-grow">{car.description}</p>
                    <p className="font-bold text-primary mt-3 text-lg">${car.rentPrice} / day</p>

                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => handleBookNow(car)}
                        disabled={car.status === "Booked"}
                        className={`flex-1 btn btn-sm border-none text-white ${
                          car.status === "Booked" ? "btn-disabled bg-base-300" : "bg-primary"
                        }`}
                      >
                        {car.status === "Booked" ? "Booked" : "Book Now"}
                      </button>

                      <Link to={`/cars/${car._id}`} className="flex-1 btn btn-sm btn-outline btn-info">
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* --- PAGINATION CONTROLS --- */}
            <div className="flex justify-center mt-12 gap-2">
              <button 
                disabled={page === 1} 
                onClick={() => setPage(page - 1)} 
                className="btn btn-sm btn-outline"
              >
                Prev
              </button>
              {[...Array(totalPages).keys()].map(num => (
                <button 
                    key={num} 
                    onClick={() => setPage(num + 1)}
                    className={`btn btn-sm ${page === num + 1 ? 'btn-primary' : 'btn-outline'}`}
                >
                    {num + 1}
                </button>
              ))}
              <button 
                disabled={page === totalPages} 
                onClick={() => setPage(page + 1)} 
                className="btn btn-sm btn-outline"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default BrowseCars;