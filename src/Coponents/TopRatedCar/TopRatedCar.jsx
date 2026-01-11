import React from "react";
import { FaStar } from "react-icons/fa";

const TopRatedCar = () => {
  return (
    /* Changed 'bg-white' to 'bg-base-100' and added 'text-base-content' */
    <section className="py-16 px-6 md:px-20 bg-base-100 text-base-content transition-colors duration-300">
        <h2 className="text-4xl text-center font-extrabold tracking-tighter uppercase pt-8 pb-10">
          Top Rated <span className="text-primary border-b-4 border-primary">Cars</span>
        </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Car 1 */}
        {/* bg-primary/10 keeps a light tint in light mode and dark mode, looking consistent */}
        <div className="p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 bg-base-200/50 border border-base-300">
          <img
            src="https://i.ibb.co.com/xq9FKmPg/c5.webp"
            alt="Car 1"
            className="w-full h-48 object-cover rounded mb-4 shadow-sm"
          />
          <h3 className="text-xl font-semibold text-primary mb-1">BMW X5</h3>
          
          {/* Changed text-secondary-content to text-yellow-500 for better star visibility in both modes */}
          <div className="flex items-center mb-2 text-yellow-500">
            <FaStar className="mr-1" />
            <FaStar className="mr-1" />
            <FaStar className="mr-1" />
            <FaStar className="mr-1" />
            <FaStar className="mr-1" />
            {/* Changed from text-base-300 to text-base-content/60 */}
            <span className="ml-2 text-base-content/60 text-sm">(5.0)</span>
          </div>
          <p className="text-base-content font-bold">$120 / day</p>
        </div>

        {/* Car 2 */}
        <div className="p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 bg-base-200/50 border border-base-300">
          <img
            src="https://i.ibb.co.com/Dg5H0Gsz/c3.webp"
            alt="Car 2"
            className="w-full h-48 object-cover rounded mb-4 shadow-sm"
          />
          <h3 className="text-xl font-semibold text-primary mb-1">Audi Q7</h3>
          <div className="flex items-center mb-2 text-yellow-500">
            <FaStar className="mr-1" />
            <FaStar className="mr-1" />
            <FaStar className="mr-1" />
            <FaStar className="mr-1" />
            <FaStar className="mr-1" />
            <span className="ml-2 text-base-content/60 text-sm">(5.0)</span>
          </div>
          <p className="text-base-content font-bold">$150 / day</p>
        </div>

        {/* Car 3 */}
        <div className="p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 bg-base-200/50 border border-base-300">
          <img
            src="https://i.ibb.co.com/DPjXJngx/c2.webp"
            alt="Car 3"
            className="w-full h-48 object-cover rounded mb-4 shadow-sm"
          />
          <h3 className="text-xl font-semibold text-primary mb-1">Mercedes GLE</h3>
          <div className="flex items-center mb-2 text-yellow-500">
            <FaStar className="mr-1" />
            <FaStar className="mr-1" />
            <FaStar className="mr-1" />
            <FaStar className="mr-1" />
            <FaStar className="mr-1" />
            <span className="ml-2 text-base-content/60 text-sm">(5.0)</span>
          </div>
          <p className="text-base-content font-bold">$180 / day</p>
        </div>
      </div>
    </section>
  );
};

export default TopRatedCar;