import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import { MdDashboardCustomize } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";
import { FaSun, FaMoon } from "react-icons/fa"; // Added icons
import {
  SiGooglecampaignmanager360,
  SiGoogletagmanager,
  SiNginxproxymanager,
  SiSamsclub,
} from "react-icons/si";
import { AiOutlineLogout, AiOutlineUser } from "react-icons/ai";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const { role } = useRole();
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  /* --- THEME LOGIC (Same as Navbar) --- */
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

  const handleLogout = () => {
    logOut().then(() => navigate("/login"));
  };

  return (
    <div className="w-full bg-base-100 min-h-screen font-sans">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content flex flex-col">
          {/* --- TOP NAVBAR (Modified to match Main Navbar) --- */}
          <nav className="navbar w-full bg-base-100/80 backdrop-blur-md sticky top-0 z-30 shadow-sm px-4 lg:px-8 border-b border-base-300">
            <div className="flex-1 flex items-center gap-2">
              <label
                htmlFor="my-drawer-4"
                className="btn btn-square btn-ghost lg:hidden"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </label>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter">
                  RENT <span className="text-primary">WHEELS</span>
                </span>
                <span className="text-[10px] uppercase font-bold text-primary tracking-widest hidden sm:block">
                  Dashboard / {role}
                </span>
              </div>
            </div>

            {/* Right Side Items */}
            <div className="flex-none gap-3">
              {/* Theme Toggle (Same as Navbar) */}
              <button
                onClick={toggleTheme}
                className="btn btn-ghost btn-circle text-xl mr-2"
              >
                {theme === "light" ? <FaMoon /> : <FaSun className="text-yellow-400" />}
              </button>

              {/* Profile Dropdown */}
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="avatar cursor-pointer ring ring-primary ring-offset-base-100 ring-offset-2 rounded-full w-10"
                >
                  <img
                    alt="User"
                    src={user?.photoURL || "https://i.ibb.co/mJR7z0f/user.png"}
                    className="rounded-full"
                  />
                </div>
                <ul
                  tabIndex={0}
                  className="mt-4 z-[1] p-2 shadow-2xl menu menu-sm dropdown-content bg-base-100 border border-base-300 rounded-2xl w-56"
                >
                  <li className="px-4 py-3 bg-base-200 rounded-t-xl mb-2">
                    <p className="font-bold text-primary">{user?.displayName || "User"}</p>
                    <p className="text-xs opacity-60 truncate">{user?.email}</p>
                  </li>
                  <li>
                    <Link to="/dashboard/profile"><AiOutlineUser /> My Profile</Link>
                  </li>
                  <li>
                    <Link to="/"><MdDashboardCustomize /> Back to Home</Link>
                  </li>
                  <div className="divider my-1"></div>
                  <li>
                    <button onClick={handleLogout} className="text-error font-bold">
                      <AiOutlineLogout /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          {/* --- MAIN PAGE CONTENT --- */}
          <div className="p-4 md:p-10 bg-base-200/30 min-h-[calc(100vh-64px)]">
            <Outlet />
          </div>
        </div>

        {/* --- SIDEBAR --- */}
        <div className="drawer-side z-40">
          <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
          <div className="menu p-6 w-72 min-h-full bg-base-100 text-base-content border-r border-base-300 shadow-xl">
            {/* Logo Section */}
            <div className="mb-8 px-2">
              <Link to="/" className="flex flex-col">
                <span className="text-2xl font-black tracking-tighter">
                  RENT <span className="text-primary">WHEELS</span>
                </span>
                <div className="badge badge-primary badge-outline text-[10px] mt-1 uppercase font-bold">
                   {role} Control Room
                </div>
              </Link>
            </div>

            <ul className="space-y-1">
              <li>
                <NavLink to="/" className="flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-base-200">
                  🏠 Main Home
                </NavLink>
              </li>

              <div className="divider text-[10px] opacity-40 font-bold tracking-widest uppercase py-4">Dashboard Menu</div>

              {/* ADMIN ROLE */}
              {role === "admin" && (
                <div className="space-y-1">
                  <li>
                    <NavLink to="/dashboard/admin/home" className={({ isActive }) => `flex items-center gap-3 py-3 px-4 rounded-xl ${isActive ? "bg-primary text-white shadow-lg" : "hover:bg-base-200"}`}>
                      <GrUserAdmin /> Overview
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/admin/manage-users" className={({ isActive }) => `flex items-center gap-3 py-3 px-4 rounded-xl ${isActive ? "bg-primary text-white shadow-lg" : "hover:bg-base-200"}`}>
                      <SiNginxproxymanager /> Manage Users
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/admin/all-cars" className={({ isActive }) => `flex items-center gap-3 py-3 px-4 rounded-xl ${isActive ? "bg-primary text-white shadow-lg" : "hover:bg-base-200"}`}>
                      <SiSamsclub /> All Inventory
                    </NavLink>
                  </li>
                </div>
              )}

              {/* DEALER ROLE */}
              {role === "carsDealer" && (
                <div className="space-y-1">
                  <li>
                    <NavLink to="/dashboard/cars-delars/cars-delar-home" className={({ isActive }) => `flex items-center gap-3 py-3 px-4 rounded-xl ${isActive ? "bg-primary text-white shadow-lg" : "hover:bg-base-200"}`}>
                      <SiGooglecampaignmanager360 /> Business Status
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/cars-delars/add-cars" className={({ isActive }) => `flex items-center gap-3 py-3 px-4 rounded-xl ${isActive ? "bg-primary text-white shadow-lg" : "hover:bg-base-200"}`}>
                      <SiNginxproxymanager /> Post New Car
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/cars-delars/my-cars" className={({ isActive }) => `flex items-center gap-3 py-3 px-4 rounded-xl ${isActive ? "bg-primary text-white shadow-lg" : "hover:bg-base-200"}`}>
                      <SiSamsclub /> My Fleet
                    </NavLink>
                  </li>
                </div>
              )}

              {/* USER ROLE */}
              {(role === "user" || role === "member") && (
                <li>
                  <NavLink to="/dashboard/user/status" className={({ isActive }) => `flex items-center gap-3 py-3 px-4 rounded-xl ${isActive ? "bg-primary text-white shadow-lg" : "hover:bg-base-200"}`}>
                    <SiGoogletagmanager /> My Rentals
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;