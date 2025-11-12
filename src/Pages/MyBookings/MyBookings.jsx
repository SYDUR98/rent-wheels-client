import { use, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../provider/AuthContext";

const MyBookings = () => {
  const { user } = use(AuthContext);
  const [bookings, setBookings] = useState([]);

  // Fetch bookings
  useEffect(() => {
    if (!user?.email) return;
    axios
      .get(`http://localhost:3000/mybookings?email=${user.email}`)
      .then((res) => setBookings(res.data))
      .catch((err) => console.log(err));
  }, [user]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-primary">My Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-accent">You have no bookings yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-base-300">
            <thead>
              <tr className="bg-primary text-primary-content">
                <th className="px-4 py-2">Car Name</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Rent Price</th>
                <th className="px-4 py-2">Location</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((car) => (
                <tr key={car._id} className="text-center border-b border-base-300">
                  <td className="px-4 py-2">{car.carName}</td>
                  <td className="px-4 py-2">{car.category}</td>
                  <td className="px-4 py-2">${car.rentPrice}</td>
                  <td className="px-4 py-2">{car.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
