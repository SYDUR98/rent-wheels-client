import React, { use } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../provider/AuthContext";

const Navbar = () => {
  const { user, logOut } = use(AuthContext);

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
      {user ? (
        <Link onClick={handleSignOut}>SignOut</Link>
      ) : (
        <Link to={"/login"}>SignIn</Link>
      )}
    </div>
  );
};

export default Navbar;
