import React from 'react';
import FeaturedCars from '../../Coponents/FeaturedCars/FeaturedCars';
import Banner from '../../Coponents/Banner/Banner';
import WhyRent from '../../Coponents/WhyRent/WhyRent';
import TopRatedCar from '../../Coponents/TopRatedCar/TopRatedCar';
import CustomerTestimonials from '../../Coponents/CustomerTestimonials/CustomerTestimonials';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedCars></FeaturedCars>
            <WhyRent></WhyRent>
            <TopRatedCar></TopRatedCar>
            <CustomerTestimonials></CustomerTestimonials>
        </div>
    );
};

export default Home;