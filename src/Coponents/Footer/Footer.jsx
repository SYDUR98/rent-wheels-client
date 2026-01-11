import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router"; 

const Footer = () => {
  return (
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
          <p className="text-sm text-base-content/70 mt-4">
            Drive your dream car with ease and comfort.
          </p>
        </div>

        {/* Updated Contact Info Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-primary">Support</h3>
          <div className="text-sm space-y-1 text-base-content/80">
            <p>Email: info@rentwheels.com</p>
            <p>Phone: +880 17xxxxxxxx</p>
            {/* Contact Us  */}
            <Link to="/contact" className="hover:text-primary transition block mt-1">
              Contact Us
            </Link>
          </div>
        </div>

        {/* Updated Links Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-primary">
            Quick Links
          </h3>
          <ul className="text-sm space-y-1">
            {/* About Us  */}
            <li>
              <Link to="/about" className="text-base-content/80 hover:text-primary transition">
                About Us
              </Link>
            </li>
          
            {/* FAQ  */}
            <li>
              <Link to="/faq" className="text-base-content/80 hover:text-primary transition">
                FAQs & Help
              </Link>
            </li>
            <li>
              <a href="#" className="text-base-content/80 hover:text-primary transition">
                Privacy Policy
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