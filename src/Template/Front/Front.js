import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';
import axios from 'axios';
import settings from '../../settings.js'
import FontAwesome from 'react-fontawesome'
import raleway from '../../../Raleway/Raleway-Medium.ttf';

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
        if (token) {
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
    }

    renderManagemantLink() {
        if (this.state.user) {
            if (settings.root_user_types.includes(this.state.user.profile.studentType)) {
                return (<a href="/management"><div className="dropDown-item">管理系統</div></a>)
            }
        }
    }

    render() {
        let state;
        if (this.state.logIn) {
            let a = <Link to='#' onClick={this.logOut} className="item url">Log out</Link>;
            let name;
            if (this.state.user.profile.student_id) {
                name = this.state.user.profile.student_id;
            } else if (this.state.user.profile.username) {
                name = this.state.user.profile.username
            } else if (this.state.user.username) {
                name = this.state.user.username
            }
            state = (
                <div className="url">
                    <input className="fkClick" />
                    {/* <FontAwesome 
                        className='user-icon'
                        name='user-circle-o'
                    /> */}
                    <div className="url-box">Hi, {name}</div>
                    <div className="dropDown">
                        <div className="dropDown-main">
                            <a href="#"><div className="dropDown-item">個人資料</div></a>
                            <a href="#" onClick={this.logOut}><div className="dropDown-item">登出</div></a>
                            {this.renderManagemantLink()}  
                        </div>
                    </div>
                </div>
            )
        } else {
            state = <Link to='/login' className="url"><div className="url-box">Login</div></Link>
        }

        return (
            <div className="header">
                <div className='brand-container'>
                    <div className="brand-image">
                        <IndexLink to='/' className='brand'>Elsa Lab</IndexLink>
                    </div>
                </div>
                <div className="urls">
                    <div className="urls-container">    
                        {/* <Link to='#' className="url">
                            <div className="url-box url-box-border">
                                Members
                            </div>
                        </Link> */}
                        <Link to='/courses' className="url">
                            <div className="url-box url-box-border">Courses</div>
                        </Link>
                        <Link to='/publications' className="url"><div className="url-box url-box-border">Publications</div></Link>
                        <Link to='/news' className="url"><div className="url-box url-box-border">News</div></Link>
                        <Link to='/contact' className="url"><div className="url-box url-box-border">Contact</div></Link>
                        {state}
                    </div>
                </div>
            </div>
        )
    }
};

export default Front;