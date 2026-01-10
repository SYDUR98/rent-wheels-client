import React, { use, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthContext";
import LoadingSpinner from "../../Coponents/LoadingSpinner/LoadingSpinner";

const MyListings = () => {
  const { user } = use(AuthContext);
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

    fetch(`https://rent-wheels-unique-api-server.vercel.app/mylisting?email=${user.email}`)
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
      background: document.documentElement.getAttribute("data-theme") === "dark" ? "#1d232a" : "#fff",
      color: document.documentElement.getAttribute("data-theme") === "dark" ? "#A6ADBB" : "#000",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://rent-wheels-unique-api-server.vercel.app/cars/${id}`, {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`https://rent-wheels-unique-api-server.vercel.app/cars/${selectedCar._id}`, {
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

  if (loading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="bg-base-100 text-base-content min-h-screen transition-colors duration-300">
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-primary pt-6">My Listings</h2>

        {listings.length === 0 ? (
          <p className="text-error italic">No cars added yet.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-base-300">
            <table className="table w-full">
              {/* Table Head */}
              <thead>
                <tr className="bg-primary text-primary-content">
                  <th className="py-4">Car Name</th>
                  <th className="py-4">Category</th>
                  <th className="py-4">Rent Price</th>
                  <th className="py-4">Status</th>
                  <th className="py-4 text-center">Actions</th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                {listings.map((car) => (
                  <tr key={car._id} className="hover:bg-base-200 transition-colors border-b border-base-300">
                    <td className="font-medium">{car.carName}</td>
                    <td>{car.category}</td>
                    <td className="font-semibold">${car.rentPrice}</td>
                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                          car.status === "Available" ? "bg-success" : "bg-warning"
                        }`}
                      >
                        {car.status}
                      </span>
                    </td>
                    <td className="flex justify-center gap-2 py-4">
                      <button
                        onClick={() => handleDelete(car._id, car.carName)}
                        className="btn btn-error btn-sm text-white"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => openModal(car)}
                        className="btn btn-primary btn-sm text-white"
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

        {/* Modal Section */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-base-100 text-base-content p-8 rounded-2xl w-full max-w-md shadow-2xl border border-base-300">
              <h3 className="text-xl font-bold mb-6 text-primary border-b border-base-300 pb-2">
                Update Car Info
              </h3>
              <form onSubmit={handleUpdate} className="space-y-4">
                <div className="form-control">
                  <label className="label font-semibold">Car Name</label>
                  <input
                    type="text"
                    name="carName"
                    value={formData.carName}
                    onChange={handleChange}
                    className="input input-bordered bg-base-200 focus:border-primary"
                    required
                  />
                </div>
                
                <div className="form-control">
                  <label className="label font-semibold">Category</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="input input-bordered bg-base-200 focus:border-primary"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label font-semibold">Rent Price ($)</label>
                  <input
                    type="number"
                    name="rentPrice"
                    value={formData.rentPrice}
                    onChange={handleChange}
                    className="input input-bordered bg-base-200 focus:border-primary"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label font-semibold">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="select select-bordered bg-base-200 focus:border-primary"
                  >
                    <option value="Available">Available</option>
                    <option value="Booked">Booked</option>
                  </select>
                </div>

                <div className="flex justify-end gap-3 mt-8">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="btn btn-ghost border border-base-300"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary text-white px-8">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListings;