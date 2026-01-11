import React from "react";
import { Link } from "react-router";
import CustomerTestimonials from "../CustomerTestimonials/CustomerTestimonials";
import WhyRent from "../WhyRent/WhyRent";

const HomeSections = () => {
  return (
    <div className="bg-base-100 text-base-content transition-colors duration-300">
      {/* 1. Features Section */}
      <WhyRent></WhyRent>

      {/* 2. Categories Section */}
      <section className="py-20 bg-base-200 transition-colors duration-300">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl text-center font-extrabold tracking-tighter uppercase pt-8 pb-10">
            Explore By{" "}
            <span className="text-primary border-b-4 border-primary">
              Category 
            </span>
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Sedan",
              "SUV",
              "Luxury",
              "Electric",
              "Convertible",
              "Hatchback",
            ].map((cat) => (
              <button
                key={cat}
                className="btn btn-outline btn-primary px-10 hover:shadow-lg hover:shadow-primary/20"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Statistics Section */}
      <section className="py-20 container mx-auto px-6">
        <div className="stats stats-vertical lg:stats-horizontal shadow-2xl w-full bg-primary text-primary-content">
          <div className="stat place-items-center py-10">
            <div className="stat-title text-primary-content/80">
              Total Users
            </div>
            <div className="stat-value text-5xl">120K</div>
            <div className="stat-desc text-primary-content/70">
              21% more than last month
            </div>
          </div>
          <div className="stat place-items-center py-10 border-base-content/10">
            <div className="stat-title text-primary-content/80">
              Cars Available
            </div>
            <div className="stat-value text-5xl">5,600+</div>
            <div className="stat-desc text-primary-content/70">
              Across 20+ cities
            </div>
          </div>
          <div className="stat place-items-center py-10 border-base-content/10">
            <div className="stat-title text-primary-content/80">
              Happy Rentals
            </div>
            <div className="stat-value text-5xl">89K</div>
            <div className="stat-desc text-primary-content/70">
              98% Satisfaction Rate
            </div>
          </div>
        </div>
      </section>

      {/* 5. Services Section */}
      <section className="py-20 bg-base-200 px-6">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl text-center font-extrabold tracking-tighter uppercase pt-8 pb-10">
              Premium Services For Your{" "}
              <span className="text-primary border-b-4 border-primary">
                Travel
              </span>
            </h2>{" "}
            <ul className="space-y-6">
              {[
                "24/7 Roadside Assistance",
                "Chauffeur-driven Options",
                "GPS Navigation Pre-installed",
                "Unlimited Kilometers",
              ].map((service, i) => (
                <li
                  key={i}
                  className="flex items-center gap-4 text-lg font-medium"
                >
                  <span className="bg-primary/20 p-2 rounded-full text-primary">
                    ✔
                  </span>{" "}
                  {service}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-primary/20 h-48 rounded-3xl border-2 border-primary/10 flex items-center justify-center text-4xl">
              🚗
            </div>
            <div className="bg-secondary/20 h-48 rounded-3xl border-2 border-secondary/10 mt-12 flex items-center justify-center text-4xl">
              ⭐
            </div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <div className="py-10">
        <CustomerTestimonials />
      </div>

      {/* 7. Blog Section */}
      <section className="py-20 container mx-auto px-6">
        
          <h2 className="text-4xl text-center font-extrabold tracking-tighter uppercase pt-8 pb-10">
           Rental Guide & <span className="text-primary border-b-4 border-primary">Tips</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="group card bg-base-100 shadow-xl overflow-hidden border border-base-300"
            >
              <figure className="overflow-hidden">
                <img
                  className="group-hover:scale-110 transition duration-500 h-56 w-full object-cover"
                  src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=400"
                  alt="Blog"
                />
              </figure>
              <div className="card-body">
                <h3 className="font-bold text-xl group-hover:text-primary transition">
                  Top 5 Places for a Road Trip this Summer
                </h3>
                <p className="text-sm text-base-content/60">
                  May 12, 2026 • 5 min read
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FAQ Section */}
      <section className="py-20 bg-base-200 px-6">
        <div className="container mx-auto max-w-3xl">
            <h2 className="text-4xl text-center font-extrabold tracking-tighter uppercase pt-8 pb-10">
          Frequently Asked <span className="text-primary border-b-4 border-primary">Questions</span>
        </h2>
          <div className="space-y-4">
            <div className="collapse collapse-plus bg-base-100 shadow-md">
              <input type="radio" name="my-accordion" defaultChecked />
              <div className="collapse-title text-xl font-semibold">
                What documents do I need to rent?
              </div>
              <div className="collapse-content text-base-content/70">
                <p>
                  You need a valid driving license, an ID/Passport, and a credit
                  card for the security deposit.
                </p>
              </div>
            </div>
            <div className="collapse collapse-plus bg-base-100 shadow-md">
              <input type="radio" name="my-accordion" />
              <div className="collapse-title text-xl font-semibold">
                Is there a mileage limit?
              </div>
              <div className="collapse-content text-base-content/70">
                <p>
                  Most of our cars come with unlimited mileage. Check the
                  specific car details page for more info.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Newsletter Section */}
      <section className="py-24 container mx-auto px-6">
        <div className="bg-primary rounded-[3rem] p-12 md:p-24 text-primary-content shadow-2xl relative overflow-hidden">
          <div className="relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Join Our Exclusive Newsletter
            </h2>
            <p className="mb-10 text-lg opacity-90 max-w-2xl mx-auto">
              Get special offers, travel tips, and new car arrival alerts
              directly in your inbox.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-lg w-full max-w-md text-base-content focus:outline-none rounded-full"
              />
              <button className="btn btn-secondary btn-lg rounded-full px-10">
                Subscribe Now
              </button>
            </div>
          </div>
          {/* Decorative shapes for Dark Mode polish */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full -ml-10 -mb-10"></div>
        </div>
      </section>

      {/* 10. Call to Action (CTA) Section */}
      <section className="py-24 bg-neutral text-neutral-content text-center px-6">
        <h2 className="text-5xl font-black mb-8 animate-bounce">
          Ready to Hit the Road?
        </h2>
        <p className="mb-10 max-w-2xl mx-auto text-xl opacity-80 leading-relaxed">
          Book your dream car in less than 2 minutes and start your journey
          today with RentWheels.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            to="/browsecars"
            className="btn btn-primary btn-lg rounded-full px-12 text-lg"
          >
            Browse Cars
          </Link>
          <Link
            to="/login"
            className="btn btn-outline btn-primary btn-lg rounded-full px-12 text-lg border-2"
          >
            Join Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomeSections;
