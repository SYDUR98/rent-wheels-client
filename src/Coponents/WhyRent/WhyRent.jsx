import React from "react";
import { FaCar, FaMoneyBillWave, FaCheckCircle, FaHeadset } from "react-icons/fa";

const WhyRent = () => {
  return (
    <section className="py-16 px-6 md:px-20 bg-white">
      <h2 className="text-4xl font-bold text-center mb-12 text-primary">
        Why Rent With Us
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Card 1 */}
        <div className="p-6 rounded-lg shadow-xl hover:shadow-2xl hover:bg-base-200/5 transition duration-300  bg-base-200/10">
          <div className="text-5xl mb-4 text-secondary-content">
            <FaCar />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-primary">
            Easy Booking
          </h3>
          <p className="text-base-300">
            Book your favorite car in just a few clicks with our seamless platform.
          </p>
        </div>

        {/* Card 2 */}
        <div className="p-6 rounded-lg shadow-xl hover:shadow-2xl hover:bg-base-200/5 transition duration-300  bg-base-200/10">
          <div className="text-5xl mb-4 text-secondary-content">
            <FaMoneyBillWave />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-primary">
            Affordable Rates
          </h3>
          <p className="text-base-300">
            We offer competitive pricing without compromising on quality.
          </p>
        </div>

        {/* Card 3 */}
        <div className="p-6 rounded-lg shadow-xl hover:shadow-2xl hover:bg-base-200/5 transition duration-300  bg-base-200/10">
          <div className="text-5xl mb-4 text-secondary-content">
            <FaCheckCircle />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-primary">
            Trusted Providers
          </h3>
          <p className="text-base-300">
            Our cars come from verified providers ensuring safety and reliability.
          </p>
        </div>

        {/* Card 4 */}
        <div className="p-6 rounded-lg shadow-xl hover:shadow-2xl hover:bg-base-200/5 transition duration-300  bg-base-200/10">
          <div className="text-5xl mb-4 text-secondary-content">
            <FaHeadset />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-primary">
            24/7 Support
          </h3>
          <p className="text-base-300">
            We are always available to assist you whenever you need help.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyRent;
