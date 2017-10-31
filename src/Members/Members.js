import React from 'react';
import Banner from './Banner/Banner';
import Main from './Main/Main';

const Members = (props) => (
  <div>
    <Banner />
    <Main match={props} />
  </div>
)

export default Members;