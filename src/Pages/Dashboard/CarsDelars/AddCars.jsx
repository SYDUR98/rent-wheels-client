import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../provider/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure"; // Import useAxiosSecure

const AddCars = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure(); // Initialize axiosSecure

  const [carData, setCarData] = useState({
    carName: "",
    description: "",
    category: "Sedan",
    rentPrice: "",
    location: "",
    image: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setCarData({ ...carData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare car object
    const newCar = {
      ...carData,
      providerName: user?.displayName,
      providerEmail: user?.email,
      status: "Available",
      createdAt: new Date(), // Good practice to add a timestamp
    };

    try {
      // Use axiosSecure instead of fetch
      // It will automatically add the Authorization header (Bearer token)
      const res = await axiosSecure.post("/cars", newCar);

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Car Added!",
          text: `${carData.carName} has been added successfully.`,
          timer: 2000,
          showConfirmButton: false,
        });

        // Reset form after successful post
        setCarData({
          carName: "",
          description: "",
          category: "Sedan",
          rentPrice: "",
          location: "",
          image: "",
        });
      }
    } catch (error) {
      console.error("Error adding car:", error);
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: error.response?.data?.message || "Something went wrong.",
      });
    }
  };

  return (
    <div>
      <div className="w-full flex justify-center mt-10">
        <h1 className="text-4xl font-black tracking-tighter uppercase border-b-4 border-primary pb-2 text-base-content text-center inline-block">
          Add New <span className="text-primary">Car</span>
        </h1>
      </div>
      <div className="max-w-3xl mx-auto p-6 bg-base-100 text-base-content rounded-lg shadow-md mt-6 border border-base-300 transition-colors duration-300">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Car Name */}
          <input
            type="text"
            name="carName"
            value={carData.carName}
            onChange={handleChange}
            placeholder="Car Name"
            className="input input-bordered w-full bg-base-100 text-base-content border-primary/50 focus:border-primary focus:ring-primary"
            required
          />

          {/* Description */}
          <textarea
            name="description"
            value={carData.description}
            onChange={handleChange}
            placeholder="Car Description"
            className="textarea textarea-bordered w-full bg-base-100 text-base-content border-primary/50 focus:border-primary focus:ring-primary"
            required
          />

          {/* Category */}
          <select
            name="category"
            value={carData.category}
            onChange={handleChange}
            className="select select-bordered w-full bg-base-100 text-base-content border-primary/50 focus:border-primary focus:ring-primary"
          >
            <option> Sedan </option>
            <option> SUV </option>
            <option> Hatchback </option>
            <option> Luxury </option>
            <option> Electric </option>
          </select>

          {/* Rent Price */}
          <input
            type="number"
            name="rentPrice"
            value={carData.rentPrice}
            onChange={handleChange}
            placeholder="Rent Price (per day)"
            className="input input-bordered w-full bg-base-100 text-base-content border-primary/50 focus:border-primary focus:ring-primary"
            required
          />

          {/* Location */}
          <input
            type="text"
            name="location"
            value={carData.location}
            onChange={handleChange}
            placeholder="Location"
            className="input input-bordered w-full bg-base-100 text-base-content border-primary/50 focus:border-primary focus:ring-primary"
            required
          />

          {/* Image URL */}
          <input
            type="url"
            name="image"
            value={carData.image}
            onChange={handleChange}
            placeholder="Hosted Image URL"
            className="input input-bordered w-full bg-base-100 text-base-content border-primary/50 focus:border-primary focus:ring-primary"
            required
          />

          {/* Provider Name (read-only) */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Provider Name</span>
            </label>
            <input
              type="text"
              value={user?.displayName || "N/A"}
              readOnly
              className="input input-bordered w-full bg-base-200 text-base-content/60 cursor-not-allowed border-base-300"
            />
          </div>

          {/* Provider Email (read-only) */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Provider Email</span>
            </label>
            <input
              type="email"
              value={user?.email || "N/A"}
              readOnly
              className="input input-bordered w-full bg-base-200 text-base-content/60 cursor-not-allowed border-base-300"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn w-full bg-primary hover:bg-primary/80 text-white border-none mt-4"
          >
            Add Car
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCars;
