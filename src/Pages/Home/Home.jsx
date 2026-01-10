import React from 'react';
import FeaturedCars from '../../Coponents/FeaturedCars/FeaturedCars';
import Banner from '../../Coponents/Banner/Banner';
import WhyRent from '../../Coponents/WhyRent/WhyRent';
import TopRatedCar from '../../Coponents/TopRatedCar/TopRatedCar';
import CustomerTestimonials from '../../Coponents/CustomerTestimonials/CustomerTestimonials';
import HomeSections from '../../Coponents/Shared/HomeSections';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedCars></FeaturedCars>
            <TopRatedCar></TopRatedCar>
            <HomeSections></HomeSections>
            
        </div>
    );
};

export default Home;