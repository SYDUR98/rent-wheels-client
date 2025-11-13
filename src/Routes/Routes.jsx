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


export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement:<ErrorPage></ErrorPage>,
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
        path: "/cars/:id",
         loader: ({ params }) =>
         fetch(`http://localhost:3000/cars/${params.id}`),
        element: <CarDetails></CarDetails>
      },
     
    ],
  },
]);
