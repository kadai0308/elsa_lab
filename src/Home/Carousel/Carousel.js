import React, { Component } from 'react';
import Slider from 'react-slick';
import './Carousel.css';

// import "~slick-carousel/slick/slick.css";
// import "~slick-carousel/slick/slick-theme.css";


class Carousel extends Component {

  render () {
    let settings = {
      infinite: true,
      autoplay: true,
      autoplaySpeed: 5000,
      fade: true,
      draggable: false,
      pauseOnHover: false,
    };
    return (
      <div className='carousel'>
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
        <Slider {...settings}>
          <div className="slide img1"></div>
          <div className="slide img2"></div>
        </Slider>
      </div>
    )
  }
}

export default Carousel;