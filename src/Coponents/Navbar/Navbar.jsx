import React, { use, useEffect, useState, useRef } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../provider/AuthContext";
import { toast } from "react-toastify";
import { FaSun, FaMoon } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = use(AuthContext);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  /* Theme State */
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  /* Close dropdown on outside click */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [user]);

  const handleSignOut = () => {
    logOut()
      .then(() => toast.success("Logout successful"))
      .catch((error) => console.error(error));
  };

  // NavLink common classes for reuse
  const linkStyles = ({ isActive }) =>
    `px-4 py-2 font-bold transition-all uppercase text-sm ${
      isActive
        ? "text-primary border-b-2 border-primary rounded-none"
        : "hover:text-primary"
    }`;

  const menuLink = (
    <>
      <li><NavLink to="/" className={linkStyles}>HOME</NavLink></li>
      <li><NavLink to="/browsecar" className={linkStyles}>BROWSE CARS</NavLink></li>

      {user && (
        <>
          <li><NavLink to="/mylisting" className={linkStyles}>MY LISTINGS</NavLink></li>
          <li><NavLink to="/mybookings" className={linkStyles}>MY BOOKINGS</NavLink></li>
        </>
      )}
    </>
  );

  return (
    /* Sticky, Fixed, Full-width and matching primary colors */
    <nav className="sticky top-0 z-[100] w-full bg-base-100/90 backdrop-blur-md shadow-md border-b border-base-200">
      <div className="navbar max-w-[1440px] mx-auto px-4 lg:px-20">
        
        {/* Left: Logo & Mobile Menu */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden p-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-4 shadow-2xl border border-base-300 gap-2 z-[110]">
              {menuLink}
            </ul>
          </div>

          <Link to="/" className="flex flex-col group">
            <span className="text-xl lg:text-2xl font-black tracking-tighter">
              RENT <span className="text-primary">WHEELS</span>
            </span>
            <span className="text-[10px] hidden md:block text-primary font-bold tracking-[0.2em]">
              DRIVE YOUR DREAMS
            </span>
          </Link>
        </div>

        {/* Center: Desktop Links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-2">{menuLink}</ul>
        </div>

        {/* Right: Theme & Profile Dropdown */}
        <div className="navbar-end gap-3">
          <button onClick={toggleTheme} className="btn btn-ghost btn-circle text-xl transition-transform active:scale-90">
            {theme === "light" ? <FaMoon /> : <FaSun className="text-yellow-400" />}
          </button>

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <div className="avatar cursor-pointer" onClick={() => setOpen(!open)}>
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 hover:opacity-80 transition">
                  <img src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"} alt="profile" />
                </div>
              </div>

              {/* Advanced Menu (Dropdown) */}
              {open && (
                <div className="absolute right-0 mt-4 w-60 bg-base-100 shadow-2xl rounded-2xl p-5 z-[120] border border-base-300 animate-in fade-in zoom-in duration-200">
                  <div className="flex flex-col items-center mb-4">
                    <img src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"} className="w-16 h-16 rounded-full border-2 border-primary p-0.5 mb-2" alt="user" />
                    <p className="font-bold text-gray-800 dark:text-white">{user.displayName || "User"}</p>
                    <p className="text-[10px] opacity-60 truncate w-full text-center">{user.email}</p>
                  </div>

                  <div className="divider my-0"></div>

                  <ul className="menu menu-sm p-0 py-2">
                    <li>
                      
                      <NavLink to="/dashboard" className="py-2 px-4 rounded-lg hover:bg-primary/10" onClick={() => setOpen(false)}>
                        Dashboard
                      </NavLink>
                    </li>
                  </ul>

                  <div className="divider my-0"></div>

                  <button onClick={handleSignOut} className="btn btn-error btn-outline btn-sm w-full mt-3 rounded-xl font-bold">
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary btn-sm px-8 rounded-full text-white font-bold border-none">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;