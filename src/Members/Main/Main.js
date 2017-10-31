import React, { Component } from 'react';
import './Main.css';
import professor from './avatars/professor/professor.jpg'

class membersMain extends Component {

  isCurrentUrlHome (path) {
    if (path === '/') {
      return true;
    } else {
      return false;
    }
  }

  render () {
    const path = this.props.match.route.path;
    const isHome = this.isCurrentUrlHome(path);
    let returnObj;
    
    if (isHome) returnObj = <SliceMode />;
    else returnObj = <FullMode />;

    return returnObj;
  }
}

const FullMode = (props) => (
  <div className="member-main">
    <div className='members-title'>
      <div>Members</div>
    </div>
    <div className="member-row">
      <div className="pCard">
        <img className="pCard-img" src={professor} alt="professor"/>
        <span className="label">李濬屹</span>
      </div>
      <div className="pCard">
        <img className="pCard-img" src={professor} alt="professor"/>
        <span className="label">李濬屹</span>
      </div>
      <div className="pCard">
        <img className="pCard-img" src={professor} alt="professor"/>
        <span className="label">李濬屹</span>
      </div>
    </div>
    <div className="member-row">
      <div className="pCard">
        <img className="pCard-img" src={professor} alt="professor"/>
        <span className="label">李濬屹</span>
      </div>
      <div className="pCard">
        <img className="pCard-img" src={professor} alt="professor"/>
        <span className="label">李濬屹</span>
      </div>
      <div className="pCard">
        <img className="pCard-img" src={professor} alt="professor"/>
        <span className="label">李濬屹</span>
      </div>
    </div>
  </div>
)

const SliceMode = (props) => (
  <div>XPPP</div>
)

export default membersMain;