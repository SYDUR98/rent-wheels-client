
import React, { useContext } from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Coponents/Navbar/Navbar';
import Footer from '../Coponents/Footer/Footer';
import LoadingSpinner from '../Coponents/LoadingSpinner/LoadingSpinner';
import { AuthContext } from '../provider/AuthContext';


const RootLayout = () => {

    const {loading} = useContext(AuthContext)

    if(loading){
    return <LoadingSpinner></LoadingSpinner>
    }

    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;