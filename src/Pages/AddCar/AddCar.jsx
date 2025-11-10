import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthContext";

const AddCar = () => {
  const { user } = useContext(AuthContext);
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
    const newCar = {
      ...carData,
      providerName: user.displayName,
      providerEmail: user.email,
      status: "Available",
    };

    try {
      const res = await fetch("http://localhost:3000/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCar),
      });
      const data = await res.json();
      console.log(data);

      Swal.fire({
        icon: "success",
        title: "Car Added!",
        text: `${carData.carName} has been added successfully.`,
        timer: 2000,
        showConfirmButton: false,
      });

      // Reset form
      setCarData({
        carName: "",
        description: "",
        category: "Sedan",
        rentPrice: "",
        location: "",
        image: "",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Something went wrong.",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4 text-[#4D9ED0]">Add New Car</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Car Name */}
        <input
          type="text"
          name="carName"
          value={carData.carName}
          onChange={handleChange}
          placeholder="Car Name"
          className="input input-bordered w-full border-[#4D9ED0] focus:border-[#4D9ED0] focus:ring-[#4D9ED0]"
          required
        />

        {/* Description */}
        <textarea
          name="description"
          value={carData.description}
          onChange={handleChange}
          placeholder="Car Description"
          className="textarea textarea-bordered w-full border-[#4D9ED0] focus:border-[#4D9ED0] focus:ring-[#4D9ED0]"
          required
        />

        {/* Category */}
        <select
          name="category"
          value={carData.category}
          onChange={handleChange}
          className="select select-bordered w-full border-[#4D9ED0] focus:border-[#4D9ED0] focus:ring-[#4D9ED0]"
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
          className="input input-bordered w-full border-[#4D9ED0] focus:border-[#4D9ED0] focus:ring-[#4D9ED0]"
          required
        />

        {/* Location */}
        <input
          type="text"
          name="location"
          value={carData.location}
          onChange={handleChange}
          placeholder="Location"
          className="input input-bordered w-full border-[#4D9ED0] focus:border-[#4D9ED0] focus:ring-[#4D9ED0]"
          required
        />

        {/* Image URL */}
        <input
          type="url"
          name="image"
          value={carData.image}
          onChange={handleChange}
          placeholder="Hosted Image URL"
          className="input input-bordered w-full border-[#4D9ED0] focus:border-[#4D9ED0] focus:ring-[#4D9ED0]"
          required
        />

        {/* Provider Name (read-only) */}
        <input
          type="text"
          value={user.displayName}
          readOnly
          className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
        />

        {/* Provider Email (read-only) */}
        <input
          type="email"
          value={user.email}
          readOnly
          className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="btn w-full bg-[#4D9ED0] hover:bg-[#357ABD] text-white border-none"
        >
          Add Car
        </button>
      </form>
    </div>
  );
};

export default AddCar;
