import React from "react";
import { toast } from "react-toastify";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Thank you! Your message has been sent.");
    e.target.reset();
  };

  return (
    <div className="bg-base-200 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-base-100 p-8 rounded-3xl shadow-2xl flex flex-col md:flex-row gap-10">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold text-primary mb-4">Get in Touch</h2>
          <p className="mb-6 opacity-70">Have questions? Our team is here to help you 24/7.</p>
          <div className="space-y-4">
            <p>📍 <strong>Location:</strong> Sylhet, Bangladesh</p>
            <p>📞 <strong>Phone:</strong> +880 1700 000000</p>
            <p>📧 <strong>Email:</strong> support@rentwheels.com</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="md:w-1/2 space-y-4">
          <input type="text" placeholder="Your Name" className="input input-bordered w-full" required />
          <input type="email" placeholder="Your Email" className="input input-bordered w-full" required />
          <textarea placeholder="Your Message" className="textarea textarea-bordered w-full h-32" required></textarea>
          <button className="btn btn-primary w-full">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;