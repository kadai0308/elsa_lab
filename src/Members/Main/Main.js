import React, { Component } from 'react';
import './Main.css';
import axios from 'axios';
import settings from '../../settings.js'
import professor from './avatars/professor/professor.jpg'

class membersMain extends Component {

  constructor(props) {
    super(props);
    this.state = {
        users: ''
    }
  }

  componentWillMount() {
    const token = localStorage.token;
    const ins = axios.create({
      baseURL: settings.backend_url,
      timeout: 1000,
      headers: {
          Authorization: "JWT " + token,
      }
    })

    ins.get('users')
    .then((res) => {
      console.log(res);
      res.data.splice(0, 1) /*delete root user*/
      let users = []
      let i = 0
      while (i < res.data.length) {

        users.push(res.data.slice(i, i+3))
        i = i+3;
      }
      console.log(users)
      this.setState({users: users})
    })
    .catch((error) => {
      console.log(error);
    })
  }

  isCurrentUrlHome (path) {
    if (path === '/') {
      return true;
    } else {
      return false;
    }
  }

  mapMember(user) {
    return (
      <div className="pCard">
        <img className="pCard-img" src={user.profile.pictureUrl} alt="professor"/>
        <span className="label">{user.profile.name}</span>
      </div>
    )
  }

  mapMemberRow(users) {
    let members = users.map((item) => (
      this.mapMember(item)
    ))
    return (
      <div className="member-row">
        {members}
      </div>
    )
  }

  render () {
    const path = this.props.match.route.path;
    const isHome = this.isCurrentUrlHome(path);
    let returnObj;
    
    if (isHome) returnObj = <SliceMode />;
    else returnObj = <FullMode />;

    let members;
    if (this.state.users) {
      members = this.state.users.map((item) => (
        this.mapMemberRow(item)
      ))
    }


    return (
      <div className="member-main">
        <div className='members-title'>
          <div>Members</div>
        </div>
        {members}
      </div>
    )
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