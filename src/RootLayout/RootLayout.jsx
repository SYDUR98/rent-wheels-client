
import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Coponents/Navbar/Navbar';
import Footer from '../Coponents/Footer/Footer';


const RootLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;