import React, { Component } from 'react';
import './InfoCard.css';
import server from './icons/server.svg';
import processor from './icons/processor.svg';
import chip from './icons/chip.svg';
import cc from './icons/cloud-computing.svg';

class InfoCard extends Component {
  render () {
    return (
      <div className='infoCard'>
        <div className="card">
          <div className="icon">
            <img src={server} alt="" />
          </div>
          <div className="title">Parallel Systems</div>
          <div className="content">
            使用平行計算技術，讓深度學習更為迅速便捷
          </div>
        </div>
        <div className="card color2">
          <div className="icon">
            <img src={processor} alt="" />
          </div>
          <div className="title">Deep Learning</div>
          <div className="content">
            藉由玩遊戲的方式，讓人工智慧愈來愈強大
          </div>
        </div>
        <div className="card">
          <div className="icon">
            <img src={chip} alt="" />
          </div>
          <div className="title">Embedded Systems</div>
          <div className="content">
            設計智慧型機器人用的嵌入式系統，使用在機器人上
          </div>
        </div>
        <div className="card color2">
          <div className="icon">
            <img src={cc} alt="" />
          </div>
          <div className="title">Cloud Database</div>
          <div className="content">
            讓機器學習算法自動儲存資料再練習，成為他的大腦
          </div>
        </div>
      </div>
    )
  }
}

export default InfoCard;