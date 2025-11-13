import React, { use, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthContext";
import LoadingSpinner from "../../Coponents/LoadingSpinner/LoadingSpinner";




const MyListings = () => {
  const {user} = use(AuthContext)
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState(null);
  const [formData, setFormData] = useState({
    carName: "",
    category: "",
    rentPrice: "",
    status: "",
  });

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:3000/mylisting?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setListings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Failed to fetch listings",
        });
        setLoading(false);
      });
  }, [user]);

  const handleDelete = (id, carName) => {
    Swal.fire({
      title: `Delete ${carName}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/cars/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            setListings(listings.filter((car) => car._id !== id));
            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: `${carName} has been deleted.`,
              timer: 2000,
              showConfirmButton: false,
            });
          })
          .catch((err) => console.error(err));
      }
    });
  };

   //Modal open function
  const openModal = (car) => {
    setSelectedCar(car);
    setFormData({
      carName: car.carName,
      category: car.category,
      rentPrice: car.rentPrice,
      status: car.status,
    });
    setModalOpen(true);
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // update functionality 
  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/cars/${selectedCar._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            icon: "success",
            title: "Updated!",
            text: `${formData.carName} has been updated.`,
            timer: 2000,
            showConfirmButton: false,
          });

          setListings(
            listings.map((car) =>
              car._id === selectedCar._id ? { ...car, ...formData } : car
            )
          );
          setModalOpen(false);
        }
      })
      .catch((err) => console.error(err));
  };


  if (loading) return <LoadingSpinner></LoadingSpinner>

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-primary">My Listings</h2>

      {listings.length === 0 ? (
        <p className="text-accent">No cars added yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-base-300">
            <thead>
              <tr className="bg-primary text-primary-content">
                <th className="px-4 py-2">Car Name</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Rent Price</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((car) => (
                <tr key={car._id} className="text-center border-b border-base-300">
                  <td className="px-4 py-2">{car.carName}</td>
                  <td className="px-4 py-2">{car.category}</td>
                  <td className="px-4 py-2">${car.rentPrice}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-white ${
                        car.status === "Available" ? "bg-success-content" : "bg-warning-content"
                      }`}
                    >
                      {car.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleDelete(car._id, car.carName)}
                      className="btn bg-secondary-content hover:bg-warning-content text-white btn-sm"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => openModal(car)}
                      className="btn bg-primary hover:bg-primary-content text-primary-content btn-sm"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            <h3 className="text-lg font-bold mb-4 text-primary">
              Update Car Info
            </h3>
            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                type="text"
                name="carName"
                value={formData.carName}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Car Name"
                required
              />
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Category"
                required
              />
              <input
                type="number"
                name="rentPrice"
                value={formData.rentPrice}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Rent Price"
                required
              />
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="Available">Available</option>
                <option value="Booked">Booked</option>
              </select>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary text-white">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyListings;
