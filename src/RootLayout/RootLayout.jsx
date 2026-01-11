import React, { useContext } from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Coponents/Navbar/Navbar';
import Footer from '../Coponents/Footer/Footer';
import { AuthContext } from '../provider/AuthContext';
import LoadingPage from '../Coponents/Shared/LoadingPage';

const RootLayout = () => {
    const { loading } = useContext(AuthContext);

   
    if (loading) {
        return <LoadingPage></LoadingPage>;
    }

    return (
       
        <div className="flex flex-col min-h-screen bg-base-100 transition-colors duration-300">
            
            
            <nav className="sticky top-0 z-50">
                <Navbar></Navbar>
            </nav>

            
            <main className="flex-grow">
                <Outlet></Outlet>
            </main>

            
            <Footer></Footer>
            
        </div>
    );
};

export default RootLayout;