import React from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const CustomerTestimonials = () => {
  return (
    /* Changed fixed background opacity and added text-base-content */
    <section className="py-16 px-6 md:px-20 bg-base-100 text-base-content transition-colors duration-300">
      <h2 className="text-4xl font-bold text-center mb-12 text-primary">
        Customer Testimonials
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Testimonial 1 */}
        {/* Changed bg to base-200 and removed text-white */}
        <div className="p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 bg-base-200/50 border border-base-300">
          <FaQuoteLeft className="text-3xl mb-4 text-primary opacity-50" />
          {/* Using base-content/80 instead of white for readability in both modes */}
          <p className="text-base-content/80 mb-4 italic">
            "Excellent service! Booking was super easy and the car was in top condition."
          </p>
          <div className="flex items-center">
            <div className="flex text-yellow-500">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            </div>
            {/* Removed text-white and used base-content */}
            <span className="ml-2 font-bold text-base-content">John D.</span>
          </div>
        </div>

        {/* Testimonial 2 */}
        <div className="p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 bg-base-200/50 border border-base-300">
          <FaQuoteLeft className="text-3xl mb-4 text-primary opacity-50" />
          <p className="text-base-content/80 mb-4 italic">
            "Affordable prices and very friendly support. Highly recommend!"
          </p>
          <div className="flex items-center">
            <div className="flex text-yellow-500">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            </div>
            <span className="ml-2 font-bold text-base-content">Maria S.</span>
          </div>
        </div>

        {/* Testimonial 3 */}
        <div className="p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 bg-base-200/50 border border-base-300">
          <FaQuoteLeft className="text-3xl mb-4 text-primary opacity-50" />
          <p className="text-base-content/80 mb-4 italic">
            "I loved the experience. 24/7 support made everything smooth and easy."
          </p>
          <div className="flex items-center">
            <div className="flex text-yellow-500">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            </div>
            <span className="ml-2 font-bold text-base-content">Alex P.</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerTestimonials;