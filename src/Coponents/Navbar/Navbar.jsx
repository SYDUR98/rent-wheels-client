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

  const menuLink = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-2 font-bold transition-all ${
              isActive
                ? "text-primary border-b-2 border-primary rounded-none"
                : "hover:text-primary"
            }`
          }
        >
          HOME
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/browsecar"
          className={({ isActive }) =>
            `px-4 py-2 font-bold transition-all ${
              isActive
                ? "text-primary border-b-2 border-primary rounded-none"
                : "hover:text-primary"
            }`
          }
        >
          BROWSE CARS
        </NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink
              to="/mylisting"
              className={({ isActive }) =>
                `px-4 py-2 font-bold transition-all ${
                  isActive
                    ? "text-primary border-b-2 border-primary rounded-none"
                    : "hover:text-primary"
                }`
              }
            >
              MY LISTINGS
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/mybookings"
              className={({ isActive }) =>
                `px-4 py-2 font-bold transition-all ${
                  isActive
                    ? "text-primary border-b-2 border-primary rounded-none"
                    : "hover:text-primary"
                }`
              }
            >
              MY BOOKINGS
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100/80 backdrop-blur-md px-4 lg:px-20 shadow-sm sticky top-0 z-50">
      {/* Left */}
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-4 shadow-2xl border border-base-300 gap-2">
            {menuLink}
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="flex flex-col group">
          <span className="text-xl lg:text-2xl font-black tracking-tighter">
            RENT <span className="text-primary">WHEELS</span>
          </span>
          <span className="text-[10px] hidden md:block text-primary font-bold tracking-[0.2em]">
            DRIVE YOUR DREAMS
          </span>
        </Link>
      </div>

      {/* Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2">{menuLink}</ul>
      </div>

      {/* Right */}
      <div className="navbar-end gap-3">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle text-xl"
        >
          {theme === "light" ? <FaMoon /> : <FaSun className="text-yellow-400" />}
        </button>

        {/* User */}
        {user ? (
          <div className="relative" ref={dropdownRef}>
            <div
              className="avatar cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  alt="profile"
                />
              </div>
            </div>

            {open && (
              <div className="absolute right-0 mt-4 w-56 bg-base-100 shadow-2xl rounded-2xl p-5 z-50 border border-base-300">
                <div className="flex flex-col items-center mb-3">
                  <img
                    src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                    className="w-16 h-16 rounded-full border-2 border-primary mb-2"
                    alt=""
                  />
                  <p className="font-bold">{user.displayName || "User"}</p>
                  <p className="text-xs opacity-60 truncate">{user.email}</p>
                </div>

                <div className="divider my-1"></div>

                <ul className="menu menu-sm gap-1">
                  <li>
                    <NavLink to="/profile" onClick={() => setOpen(false)}>
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard" onClick={() => setOpen(false)}>
                      Dashboard
                    </NavLink>
                  </li>
                </ul>

                <div className="divider my-1"></div>

                <button
                  onClick={handleSignOut}
                  className="btn btn-error btn-outline btn-sm w-full"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary btn-sm px-8 rounded-full">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
