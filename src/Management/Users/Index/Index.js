import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import './Index.css'
import settings from '../../../settings.js'

class userIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
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
            this.setState({users: res.data})
        })
        .catch((error) => {
            console.log(error);
        })
    }

    render() {
        let users = this.state.users.map((item) => (
                <div className='user-index-user' key={item.id}>
                        <img src={item.profile.pictureUrl} alt="" className='user-index-avater'/>
                        <div className='user-index-user-info'>{item.username}</div>
                        <div className='user-index-user-info'>{item.profile.name}</div>
                        <div className='user-index-user-info'>{item.profile.studentType}</div>
                </div>
            ))

        return(
            <div className='user-index-bg'>
                <div className='user-index-main'>
                    <div className='user-index-btn-group'>
                        <Link className='user-index-link-btn' to="/management/user/new">add user</Link>
                    </div>
                    <div className='user-index-users'>
                        {users}
                    </div>
                </div>
            </div>
        )
    }
}

export default userIndex;