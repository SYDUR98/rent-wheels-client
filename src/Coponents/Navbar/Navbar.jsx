import React, { use, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../provider/AuthContext";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = use(AuthContext);
  const [open, setOpen] = useState(false);
  useEffect(() => {
  setOpen(false);
}, [user]);

// console.log(user?.accessToken)

  const handleSignOut = () => {
    logOut()
      .then(() => {
        console.log("signout successfully");
      })
      .then((error) => {
        console.log(error);
      });
  };

  const manuLink = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md font-medium transition-colors duration-300 ${
              isActive ? " text-primary" : " hover:text-primary "
            }`
          }
        >
          HOME
        </NavLink>
      </li>

      <li>
        <NavLink
          to="browsecar"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md  font-medium transition-colors duration-300 ${
              isActive ? " text-primary" : " hover:text-primary "
            }`
          }
        >
          BROWSE CARS
        </NavLink>
      </li>
{
        user && 
        <>
          <li>
        <NavLink
          to="/addcar"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md font-medium transition-colors duration-300 ${
              isActive ? " text-primary" : "hover:text-primary "
            }`
          }
        >
          ADD A CAR
        </NavLink>
      </li>
        <li>
        <NavLink
          to="/mylisting"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md font-medium transition-colors duration-300 ${
              isActive ? " text-primary" : "hover:text-primary "
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
            `px-4 py-2 rounded-md font-medium transition-colors duration-300 ${
              isActive ? " text-primary" : "hover:text-primary "
            }`
          }
        >
          MY BOOKINGS
        </NavLink>
      </li>
        
      
        </>
      }
     {
       !user && <>
      <li>
        <NavLink
          to="/register"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md  font-medium transition-colors duration-300 ${
              isActive ? " text-primary" : " hover:text-primary "
            }`
          }
        >
          REGISTER
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md font-medium transition-colors duration-300 ${
              isActive ? " text-primary" : "hover:text-primary "
            }`
          }
        >
          LOGIN
        </NavLink>
      </li>
      
      </>
     }

      
    </>
  );
  return (
    <div className="px-20 navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {manuLink}
          </ul>
        </div>
        <div className="flex flex-col">
          <a className="text-2xl font-bold">
            RENT <span className="text-primary">WHEELS</span>
          </a>
          <a className="">
            <span className="text-primary">Car</span> Rental Platform
          </a>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{manuLink}</ul>
      </div>
      <div className="navbar-end"></div>
      
      {/* user functionality  */}
        {user ? (
          <div className="relative">
           
            <img
              src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
              alt="User"
              onClick={() => setOpen(!open)}
              className="w-15 h-7 rounded-full object-cover"
            />

            {/* click open dropdowan optin */}
            {open && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-3 text-sm z-10">
                <p className="font-semibold">{user.displayName || "No Name"}</p>
                <p className="text-gray-500">{user.email}</p>
                <hr className="my-2" />
                <button
                  onClick={handleSignOut}
                  className="w-full text-left text-red-600 hover:underline"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        ) : (
          
            <Link
              to="/login"
              className="px-4 py-2 bg-primary text-white rounded-md"
            >
              Login
            </Link>
         
        )}



    </div>
  );
};

export default Navbar;
