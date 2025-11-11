import React, { use, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthContext";




const MyListings = () => {
  const {user} = use(AuthContext)
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
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
                      className={`px-3 py-2 rounded-full text-white ${
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
    </div>
  );
};

export default MyListings;
