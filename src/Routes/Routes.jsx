import React from 'react';
import { BrowserRouter, createBrowserRouter } from "react-router";
import RootLayout from '../RootLayout/RootLayout';
import Home from '../Pages/Home/Home';
import Register from '../Pages/Register/Register';
import Login from '../Pages/Login/Login';
import BrowseCars from '../Pages/BrowseCars/BrowseCars';


export const router = createBrowserRouter([
  {
    path: "/",
    element:<RootLayout></RootLayout>,
    children:[
      {
      index:true,
      element:<Home></Home>
    },
    {
      path:"/browsecar",
      element:<BrowseCars></BrowseCars>
    },
    {
      path:"/register",
      element:<Register></Register>
    },
    {
      path:"/login",
      element:<Login></Login>
    },

  ]
    
  },
]);