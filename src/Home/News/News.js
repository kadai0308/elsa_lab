import React from 'react';
import './News.css';

const News = (props) => (
  <div className="news">
    <div className='news-title'>
      <div>News</div>
    </div>
    <div className="latest-news">
      <div className="img"></div>
      <div className="news-main">
        <div className="title">
          NVIDIA Intelligent Embedded Robotics Challenge 
        </div>
        <div className="content">
          本實驗室於2016年二月至九月間，組成研究團隊NVISION，參與NVIDIA公司所主辦之嵌入式智慧型機器人競賽，並獲得全國冠軍的佳績。此競賽著重於結合視覺辨識與嵌入式圖形處理器系統，包含三個部分：
          本團隊亦為所參賽之20組全過大專院校隊伍中，能完整完成三項挑戰關卡之唯一隊伍。本團隊於各個關卡中所獲得之分項分數，亦各為所有團隊中的最高分。
        </div>
      </div>
    </div>
  </div>
)

export default News;