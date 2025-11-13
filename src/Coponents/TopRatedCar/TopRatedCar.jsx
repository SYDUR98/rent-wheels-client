import React from "react";
import { FaStar } from "react-icons/fa";

const TopRatedCar = () => {
  return (
    <section className="py-16 px-6 md:px-20 bg-white">
      <h2 className="text-4xl font-bold text-center mb-12 text-primary">
        Top Rated Cars
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Car 1 */}
        <div className="p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 bg-primary/10">
          <img
            src="https://i.ibb.co.com/xq9FKmPg/c5.webp"
            alt="Car 1"
            className="w-full h-48 object-cover rounded mb-4"
          />
          <h3 className="text-xl font-semibold text-primary mb-1">BMW X5</h3>
          <div className="flex items-center mb-2 text-secondary-content">
            <FaStar className="mr-1" />
            <FaStar className="mr-1" />
            <FaStar className="mr-1" />
            <FaStar className="mr-1" />
            <FaStar className="mr-1" />
            <span className="ml-2 text-base-300">(5.0)</span>
          </div>
          <p className="text-base-300 font-semibold">$120 / day</p>
        </div>

        {/* Car 2 */}
        <div className="p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 bg-primary/10">
          <img
            src="https://i.ibb.co.com/Dg5H0Gsz/c3.webp"
            alt="Car 2"
            className="w-full h-48 object-cover rounded mb-4"
          />
          <h3 className="text-xl font-semibold text-primary mb-1">Audi Q7</h3>
          <div className="flex items-center mb-2 text-secondary-content">
            <FaStar className="mr-1" />
            <FaStar className="mr-1" />
            <FaStar className="mr-1" />
            <FaStar className="mr-1" />
            <FaStar className="mr-1" />
            <span className="ml-2 text-base-300">(5.0)</span>
          </div>
          <p className="text-base-300 font-semibold">$150 / day</p>
        </div>

        {/* Car 3 */}
        <div className="p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 bg-primary/10">
          <img
            src="https://i.ibb.co.com/DPjXJngx/c2.webp"
            alt="Car 3"
            className="w-full h-48 object-cover rounded mb-4"
          />
          <h3 className="text-xl font-semibold text-primary mb-1">Mercedes GLE</h3>
          <div className="flex items-center mb-2 text-secondary-content">
            <FaStar className="mr-1" />
            <FaStar className="mr-1" />
            <FaStar className="mr-1" />
            <FaStar className="mr-1" />
            <FaStar className="mr-1" />
            <span className="ml-2 text-base-300">(5.0)</span>
          </div>
          <p className="text-base-300 font-semibold">$180 / day</p>
        </div>
      </div>
    </section>
  );
};

export default TopRatedCar;
