import React, { Component } from 'react';
import Slider from 'react-slick';
import './Sayings.css'

class Saying extends Component {
  render () {

    let settings = {
      infinite: true,
      autoplay: true,
      autoplaySpeed: 3000,
      fade: true,
      draggable: false,
      initialSlide: 0,
    };

    return (
      <div className='sayings'>
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
        <Slider {...settings}>
          <div className='saying-content'>「 在非洲，每 60 秒就過了 1 分鐘 」 - XXX</div>
          <div className='saying-content'>「 不要睡覺可以解決任何事，包括念不完的期中考 」 - XXX</div>
        </Slider>
      </div>
    )
  }
}

export default Saying;