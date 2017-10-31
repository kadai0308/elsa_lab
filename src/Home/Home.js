import React from 'react';
import Carousel from './Carousel/Carousel'
import InfoCard from './InfoCard/InfoCard'
import News from './News/News'
import Members from './Members/Members'
import Sayings from './Sayings/Sayings'


const Home = (props) => (
  <div>
    <Carousel />
    <InfoCard />
    <News />
    <Members />
    <Sayings />
  </div>
)

export default Home;