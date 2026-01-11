import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthContext";
import LoadingSpinner from "../../Coponents/LoadingSpinner/LoadingSpinner";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingPage from "../../Coponents/Shared/LoadingPage";

const MyListings = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    carName: "",
    category: "",
    rentPrice: "",
    status: "",
  });

  // Fetch Data
  useEffect(() => {
    const fetchListings = async () => {
      if (!user?.email) return;
      try {
        setLoading(true);
        // axiosSecure automatically attaches the auth token
        const { data } = await axiosSecure.get(`/mylisting?email=${user.email}`);
        
        // Safety Check: ensure data is an array
        if (Array.isArray(data)) {
          setListings(data);
        } else {
          setListings([]);
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        setListings([]); // fallback to empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [user?.email, axiosSecure]);

  // Delete Action
  const handleDelete = (id, carName) => {
    Swal.fire({
      title: `Delete ${carName}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      background: document.documentElement.getAttribute("data-theme") === "dark" ? "#1d232a" : "#fff",
      color: document.documentElement.getAttribute("data-theme") === "dark" ? "#A6ADBB" : "#000",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axiosSecure.delete(`/cars/${id}`);
          if (data.deletedCount > 0) {
            setListings(listings.filter((car) => car._id !== id));
            Swal.fire("Deleted!", "Car has been removed.", "success");
          }
        } catch (err) {
          Swal.fire("Error", "Failed to delete the car", "error");
        }
      }
    });
  };

  // Update Modal Logic
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosSecure.put(`/cars/${selectedCar._id}`, formData);
      if (data.modifiedCount > 0) {
        setListings(listings.map((car) =>
          car._id === selectedCar._id ? { ...car, ...formData } : car
        ));
        setModalOpen(false);
        Swal.fire("Updated!", "Car details updated successfully.", "success");
      }
    } catch (err) {
      Swal.fire("Error", "Update failed", "error");
    }
  };

  if (loading) return <LoadingPage></LoadingPage>;

  return (
    <div className="bg-base-100 text-base-content min-h-screen transition-colors duration-300">
      <div className="max-w-6xl mx-auto mt-12   ">
        <h2 className="text-4xl text-center font-extrabold tracking-tighter uppercase pt-8 pb-10">
          My Listed <span className="text-primary border-b-4 border-primary">Cars</span>
        </h2>
        

        {!Array.isArray(listings) || listings.length === 0 ? (
          <div className="text-center py-20 bg-base-200 rounded-2xl border-2 border-dashed border-base-300">
             <p className="text-xl opacity-50 font-medium">You haven't listed any cars yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-base-300 shadow-lg">
            <table className="table w-full">
              <thead>
                <tr className="bg-primary text-primary-content text-lg">
                  <th>Car Info</th>
                  <th>Category</th>
                  <th>Rent/Day</th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((car) => (
                  <tr key={car._id} className="hover:bg-base-200 transition-colors border-b border-base-300">
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={car.image} alt={car.carName} />
                          </div>
                        </div>
                        <div className="font-bold">{car.carName}</div>
                      </div>
                    </td>
                    <td><span className="badge badge-ghost font-semibold">{car.category}</span></td>
                    <td className="font-bold text-primary">${car.rentPrice}</td>
                    <td>
                      <span className={`badge border-none text-white font-bold p-3 ${
                          car.status === "Available" ? "bg-success" : "bg-warning"
                        }`}>
                        {car.status}
                      </span>
                    </td>
                    <td className="flex justify-center gap-2">
                      <button onClick={() => openModal(car)} className="btn btn-primary btn-sm rounded-lg">Update</button>
                      <button onClick={() => handleDelete(car._id, car.carName)} className="btn btn-error btn-sm rounded-lg text-white">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[100] p-4">
            <div className="bg-base-100 p-8 rounded-2xl w-full max-w-md shadow-2xl border border-primary/20">
              <h3 className="text-2xl font-bold mb-6 text-primary text-center">Update Car Information</h3>
              <form onSubmit={handleUpdate} className="space-y-4">
                <div className="form-control">
                  <label className="label font-bold text-sm">Car Name</label>
                  <input type="text" name="carName" value={formData.carName} onChange={handleChange} className="input input-bordered focus:border-primary" required />
                </div>
                <div className="form-control">
                  <label className="label font-bold text-sm">Category</label>
                  <input type="text" name="category" value={formData.category} onChange={handleChange} className="input input-bordered focus:border-primary" required />
                </div>
                <div className="form-control">
                  <label className="label font-bold text-sm">Rent Price ($)</label>
                  <input type="number" name="rentPrice" value={formData.rentPrice} onChange={handleChange} className="input input-bordered focus:border-primary" required />
                </div>
                <div className="form-control">
                  <label className="label font-bold text-sm">Status</label>
                  <select name="status" value={formData.status} onChange={handleChange} className="select select-bordered focus:border-primary">
                    <option value="Available">Available</option>
                    <option value="Booked">Booked</option>
                  </select>
                </div>
                <div className="flex justify-end gap-3 mt-8">
                  <button type="button" onClick={() => setModalOpen(false)} className="btn btn-ghost font-bold">Cancel</button>
                  <button type="submit" className="btn btn-primary px-8 font-bold">Save Changes</button>
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