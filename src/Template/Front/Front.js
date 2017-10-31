import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';
import axios from 'axios';
import settings from '../../settings.js'

class Front extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logIn: '',
            user: ''
        }
        // ????????
        this.logOut = this.logOut.bind(this);
    }

    logOut() {
        delete localStorage.token;
        delete localStorage.user_id;
        location.reload();
    }

    componentWillMount() {
        const user_id = localStorage.user_id;
        const token = localStorage.token;
        const ins = axios.create({
            baseURL: settings.backend_url,
            timeout: 1000,
            headers: {
                Authorization: "JWT " + token,
            }
        })

        ins.get('user/' + user_id)
        .then((res) => {
            console.log(res);
            this.setState({user: res.data, logIn: true})
        })
        .catch((error) => {
            console.log(error);
            this.setState({logIn: false})
        })
    }

    render() {
        let state;
        if (this.state.logIn) {
            let a = <Link to='#' onClick={this.logOut} className="item url">Log out</Link>;
            state = (
                <div className="item url line-height100">
                    <input className="fkClick" />
                    hi, {this.state.user.username}
                    <div className="dropDown">
                        <div className="dropDown-main">
                            <a href="#"><div className="dropDown-item">個人資料</div></a>
                            <a href="#" onClick={this.logOut}><div className="dropDown-item">登出</div></a>
                            <a href="/management"><div className="dropDown-item">管理系統</div></a>
                        </div>
                    </div>
                </div>
            )
        } else {
            state = <Link to='/login' className="item url">Login</Link>
        }

        return (
            <div className="header">
                <IndexLink to='/' className='brand'>Elsa Lab</IndexLink>
                <Link to='/members' className="item url">Members</Link>
                <Link to='/courses' className="item url">Courses</Link>
                <Link to='/publications' className="item url">Publications</Link>
                <Link to='/contact' className="item url">Contact</Link>
                {state}
            </div>
        )
    }
};

export default Front;