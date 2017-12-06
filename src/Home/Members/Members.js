import React, { Component } from 'react';
import axios from 'axios';
import settings from '../../settings.js'
import './Members.css';
import avatar1 from './avatars/avatar1.jpg'
import avatar2 from './avatars/avatar2.jpg'
import avatar3 from './avatars/avatar3.jpg'

class Members extends Component {
  
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
      res.data.splice(0, 3) /*delete root user*/
      this.setState({users: res.data})
    })
    .catch((error) => {
      console.log(error);
    })
  }
  
  mapMember (user) {
    return (
      <div className="content" key={user.id}>
        <img src={user.profile.pictureUrl} alt="" className='avatar'/>
        <div className="title">
          <span className="degree">{user.profile.studentType}</span>
          <br />
          <span className="name">{user.profile.name}</span>
        </div>
      </div>
    )
  }

  render() {
    let users;
    if (this.state.users) {
      users = this.state.users.map((item) => (
        this.mapMember(item)
      ))
    }
    return (
      <div className="members">
        <div className='members-title'>
          <div><a href='/members' className='members-link'>Members</a></div>
        </div>
        <div className="members-main">
          {users}
          {/*<div className="pic-mask">
                      <img src={avatar2} alt="" className="img"/>
                      <img src={avatar1} alt="" className="img"/>
                    </div>
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
          </div>*/}
        </div>
      </div>
    )
  }
}

export default Members