import React, { Component } from 'react';
import './Members.css';
import avatar1 from './avatars/avatar1.jpg'
import avatar2 from './avatars/avatar2.jpg'
import avatar3 from './avatars/avatar3.jpg'

class Members extends Component {
  render() {
    return (
      <div className="members">
        <div className='members-title'>
          <div>Members</div>
        </div>
        <div className="members-main">
          {/*<div className="pic-mask">
                      <img src={avatar2} alt="" className="img"/>
                      <img src={avatar1} alt="" className="img"/>
                    </div>*/}
          <div className="content">
            <img src={avatar1} alt="" className='avatar'/>
            <div className="title">
              <span className="degree">Professor</span>
              <br />
              <span className="name">李濬屹</span>
            </div>
          </div>
          <div className="content">
            <img src={avatar2} alt="" className='avatar'/>
            <div className="title">
              <span className="degree">Master Student</span>
              <br />
              <span className="name">張芸綺</span>
            </div>
          </div>
          <div className="content">
            <img src={avatar3} alt="" className='avatar'/>
            <div className="title">
              <span className="degree">Collage Student</span>
              <br />
              <span className="name">張冠譽</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Members