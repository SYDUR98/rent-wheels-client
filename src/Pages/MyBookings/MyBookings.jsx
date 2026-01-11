import { use, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../provider/AuthContext";
import LoadingSpinner from "../../Coponents/LoadingSpinner/LoadingSpinner";

const MyBookings = () => {
  const { user } = use(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch bookings
  useEffect(() => {
    if (!user?.email) return;
    axios
      .get(`https://rent-wheels-unique-api-server.vercel.app/mybookings?email=${user.email}`)
      .then((res) => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    /* Added bg-base-100 and text-base-content for theme support */
    <div className="bg-base-100 text-base-content min-h-screen transition-colors duration-300">
      <div className="max-w-6xl mx-auto p-6">
        
        <h2 className="text-4xl text-center font-extrabold tracking-tighter uppercase pt-8 pb-10">
          My <span className="text-primary border-b-4 border-primary">Bookings</span>
        </h2>

        {bookings.length === 0 ? (
          <p className="text-error italic">You have no bookings yet.</p>
        ) : (
          /* Added border and rounded corners to the table container */
          <div className="overflow-x-auto rounded-lg border border-base-300">
            <table className="table w-full">
              {/* Table Head with primary background */}
              <thead>
                <tr className="bg-primary text-primary-content">
                  <th className="py-4 text-center">Car Name</th>
                  <th className="py-4 text-center">Category</th>
                  <th className="py-4 text-center">Rent Price</th>
                  <th className="py-4 text-center">Location</th>
                </tr>
              </thead>
              {/* Table Body with hover effects */}
              <tbody>
                {bookings.map((car) => (
                  <tr 
                    key={car._id} 
                    className="hover:bg-base-200 transition-colors border-b border-base-300 text-center"
                  >
                    <td className="py-4 font-medium">{car.carName}</td>
                    <td className="py-4">{car.category}</td>
                    <td className="py-4 font-semibold text-primary">
                      ${car.rentPrice}
                    </td>
                    <td className="py-4">{car.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;