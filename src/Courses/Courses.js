import React from 'react';
import Banner from './Banner/Banner';
import Main from './Main/Main';

const Courses = (props) => (
    <div>
        <Banner></Banner>
        <Main match={props} />
    </div>
)

export default Courses;