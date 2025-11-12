import React from 'react';
import FeaturedCars from '../../Coponents/FeaturedCars/FeaturedCars';
import Banner from '../../Coponents/Banner/Banner';
import WhyRent from '../../Coponents/WhyRent/WhyRent';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedCars></FeaturedCars>
            <WhyRent></WhyRent>
        </div>
    );
};

export default Home;