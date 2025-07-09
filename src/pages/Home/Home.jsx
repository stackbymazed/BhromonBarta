import React from 'react';
import Banner from '../../Components/Banner/Banner';
import Overview from '../../Components/Overview/Overview';
import TravelGuide from '../../Components/TravelGuide/TravelGuide';
import TouristStorySection from '../../Components/TouristStorySection/TouristStorySection';
import TravelerReviews from '../../Components/TravelerReviews/TravelerReviews';
import PopularCuisine from '../../Components/PopularCuisine/PopularCuisine';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <Overview></Overview>
           <TravelGuide></TravelGuide>
           <TouristStorySection></TouristStorySection>
           <PopularCuisine></PopularCuisine>
           <TravelerReviews></TravelerReviews>
        </div>
    );
};

export default Home;