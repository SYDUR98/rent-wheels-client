import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    /* Changed bg-black to bg-base-200 and text-white to text-base-content */
    <footer className="bg-base-200 text-base-content py-10 mt-10 transition-colors duration-300">
      <div className="px-6 md:px-20 mx-auto grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8">
        
        {/* Logo & Website Name */}
        <div>
          <div className="flex flex-col">
            <a className="text-2xl font-bold uppercase">
              RENT <span className="text-primary">WHEELS</span>
            </a>
            <span className="text-sm font-medium">
              <span className="text-primary">Car</span> Rental Platform
            </span>
          </div>
          {/* Using opacity for subtle text */}
          <p className="text-sm text-base-content/70 mt-4">
            Drive your dream car with ease and comfort.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-primary">Contact</h3>
          <div className="text-sm space-y-1 text-base-content/80">
            <p>Email: info@rentwheels.com</p>
            <p>Phone: +880 17xxxxxxxx</p>
            <p>Sylhet, Bangladesh</p>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-primary">
            Terms & Conditions
          </h3>
          <ul className="text-sm space-y-1">
            <li>
              <a href="#" className="text-base-content/80 hover:text-primary transition">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-base-content/80 hover:text-primary transition">
                Refund Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-base-content/80 hover:text-primary transition">
                FAQs
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-primary">
            Follow Us
          </h3>
          <div className="flex gap-4 text-2xl">
            <a href="#" className="hover:text-primary transition-transform hover:scale-110">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-primary transition-transform hover:scale-110">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-primary transition-transform hover:scale-110">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-primary transition-transform hover:scale-110">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="border-t border-base-300 mt-8 pt-4 text-center text-sm text-base-content/50">
        © {new Date().getFullYear()} RentWheels. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;