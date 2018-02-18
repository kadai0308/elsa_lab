import React, { Component } from 'react';
import axios from 'axios';
import './Main.css'
import settings from '../../settings.js'

class loginMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            password: '',
            message: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderMessage = this.renderMessage.bind(this);
    }

    renderMessage() {
        if (this.state.message) {
            return (
                <div className="message">
                    {this.state.message}
                </div>
            )
        }
    }

    handleChange(id, event) {
        if (id === 'account') {
            this.setState({account: event.target.value});
        } else if (id === 'password') {
            this.setState({password: event.target.value});
        }
    }

    handleSubmit(event) {
        let react_ins = this;
        axios.post(settings.backend_url + '/api-token-auth/', {
            username: this.state.account,
            password: this.state.password
        })
        .then(function (response) {
            console.log(response);
            const user_id = response.data.user.id;
            localStorage.token = response.data.token;
            localStorage.user_id = user_id
            // redirect to user page
            if (settings.root_user_types.includes(response.data.user.profile.studentType)) {
                window.location = `${settings.root_url}/management/users`
            } else {
                let url = new URL(window.location.href);
                let redirect_url = url.searchParams.get("redirect_url");
                if (redirect_url) {
                    window.location = redirect_url;
                } else {
                    window.location = '/';
                }
            }
        })
        .catch(function (error) {
            console.log(error.response);
            // handle login error
            if (error) {
                // set error message or fade out after 2s.
                react_ins.setState({message: 'Account or Password error.'}, 
                    () => setTimeout(() => react_ins.setState({message:''}),2000))
            }
        })
        event.preventDefault();
    }

    render() {
        return (
            <div className='bg'>
                {this.renderMessage()}
                <div className="login-main-card">
                    <div className="login-title">Login</div>
                    <div className="login-form">
                        <div className="login-form-group">
                            <input className='login-form-input' placeholder='Account' type="text" value={this.state.account} onChange={(e) => this.handleChange('account', e)} />
                        </div>
                        <div className="login-form-group">
                            <input className='login-form-input' placeholder='Password' type="password" value={this.state.password} onChange={(e) => this.handleChange('password', e)} />
                        </div>
                        {/*<div className="login-form-group flex">
                            <div className="box">
                                <div onClick={(e) => this.handleSubmit(e)} href="#" className="login-form-button submit">Submit</div>
                            </div>
                            <div className="box">
                                <a href="/register"><div href="/register" className="login-form-button">Register</div></a>
                            </div>
                        </div>*/}
                        <div className="login-form-group">
                            <div onClick={(e) => this.handleSubmit(e)} href="#" className="login-form-button submit">Submit</div>
                            <a className='link' href="/register"><div href="/register" className="login-form-button">Register</div></a>
                        </div>
                    </div>
                {/*<button onClick={this.testClick}>test</button>*/}
                </div>
            </div>
        );
    }
}

export default loginMain;