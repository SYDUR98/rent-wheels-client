import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 mt-10">
      <div className="px-20 mx-auto  grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8">
        {/* Logo & Website Name */}
        <div>
          <div className="flex flex-col">
          <a className="text-2xl font-bold">RENT <span className="text-primary">WHEELS</span></a>
          <a ><span  className="text-primary">Car</span> <span className="text-bg-base-300">Rental Platform</span></a>
        </div>
          <p className="text-sm text-bg-base-300 mt-4">
            Drive your dream car with ease and comfort.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-primary">Contact</h3>
          <p className="text-sm text-white">Email: info@rentwheels.com</p>
          <p className="text-sm text-white">Phone: +880 17xxxxxxxx</p>
          <p className="text-sm text-white">Sylhet, Bangladesh</p>
        </div>

        {/* Terms & Conditions */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-primary">
            Terms & Conditions
          </h3>
          <ul className="text-sm space-y-1 text-gray-300">
            <li>
              <a href="#" className=" text-white hover:text-primary">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-primary">
                Refund Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-primary">
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
            <a href="#" className="hover:text-primary">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-primary">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-primary">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-primary">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} RentWheels. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
