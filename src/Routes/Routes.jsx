import React from "react";
import { BrowserRouter, createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import BrowseCars from "../Pages/BrowseCars/BrowseCars";
import AddCar from "../Pages/AddCar/AddCar";
import MyListings from "../Pages/MyListings/MyListings";
import MyBookings from "../Pages/MyBookings/MyBookings";
import PrivateRoute from "../provider/PrivateRoute";
import CarDetails from "../Pages/CarDetails";
import ErrorPage from "../Coponents/ErrorPage/ErrorPage";
import DashboardLayout from "../RootLayout/DashboardLayout";
import AdminRoute from "./AdminRoute";
import AdminHome from "../Pages/Dashboard/Admin/AdminHome";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import CarsDealerRoute from "./CarsDelarsRoute";
import AddCars from "../Pages/Dashboard/CarsDelars/AddCars";
import CarsDelarsHome from "../Pages/Dashboard/CarsDelars/CarsDelarsHome";
import MyAllCars from "../Pages/Dashboard/CarsDelars/MyAllCars";
import UserRoute from "./UserRoute";
import UserStatus from "../Pages/Dashboard/Users/UserStatus";
import Profile from "../Coponents/Shared/Profile";
import AllInventory from "../Pages/Dashboard/Admin/AllInventory";
import About from "../Coponents/AditionalPage/About";
import Contact from "../Coponents/AditionalPage/Contact";
import FAQ from "../Coponents/AditionalPage/FAQ";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    // errorElement:<ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/browsecar",
        element: <BrowseCars></BrowseCars>,
      },
      {
        path: "/addcar",
        element: (
          <PrivateRoute>
            <AddCar></AddCar>
          </PrivateRoute>
        ),
      },
      {
        path: "/mylisting",
        element: (
          <PrivateRoute>
            <MyListings></MyListings>
          </PrivateRoute>
        ),
      },
      {
        path: "/mybookings",
        element: (
          <PrivateRoute>
            <MyBookings></MyBookings>
          </PrivateRoute>
        ),
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/contact",
        element:<Contact></Contact>,
      },
      {
        path: "/faq",
        element: <FAQ></FAQ>
      },
      {
        path: "/cars/:id",
         loader: ({ params }) =>
         fetch(`https://rent-wheels-unique-api-server.vercel.app/cars/${params.id}`),
        element: <CarDetails></CarDetails>
      },
     
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
     children: [
       {
        path: "profile",
        element: (
          <Profile></Profile>
        ),
      },
       {
        path: "admin/home",
        element: (
          <AdminRoute>
            <AdminHome></AdminHome>
          </AdminRoute>
        ),
      },
      {
        path: "admin/manage-users",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "admin/all-cars",
        element: (
          <AdminRoute>
            <AllInventory></AllInventory>
          </AdminRoute>
        ),
      },
      {
        path: "cars-delars/add-cars",
        element: (
          <CarsDealerRoute>
            <AddCars></AddCars>
          </CarsDealerRoute>
        ),
      },
      {
        path: "cars-delars/cars-delar-home",
        element: (
          <CarsDealerRoute>
            <CarsDelarsHome></CarsDelarsHome>
          </CarsDealerRoute>
        ),
      },
      {
        path: "cars-delars/my-cars",
        element: (
          <CarsDealerRoute>
            <MyAllCars></MyAllCars>
          </CarsDealerRoute>
        ),
      },
      {
        path: "user/status",
        element: (
         <UserRoute>
            <UserStatus></UserStatus>
         </UserRoute>
        ),
      },

     ]
  }
]);
