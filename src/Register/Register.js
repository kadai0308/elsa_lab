import React, { Component } from 'react';
import './Register.css';
import axios from 'axios';
import settings from '../settings.js';
import FontAwesome from 'react-fontawesome'

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            password: '',
            student_id: '',
            message: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateEmail() {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(this.state.account);
    }

    validateEmailIcon() {
        if (this.validateEmail()) {
            return (<FontAwesome className='valid register-icon' name='check-circle-o' />)
        } else {
            return (<FontAwesome className='not-valid register-icon' name='times-circle-o' />)
        }
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
        } else if (id === 'student_id') {
            this.setState({student_id: event.target.value});
        }
    }

    handleSubmit(event) {
        let react_ins = this;
        axios.post(settings.backend_url + '/users', {
            username: this.state.account,
            password: this.state.password,
            student_id: this.state.student_id,
        })
        .then(function (response) {
            console.log(response);
            // redirect to user page
            if (response.data.type === 'error') {
                react_ins.setState({message: response.data.message}, 
                    () => setTimeout(() => react_ins.setState({message:''}),2000))    
            } else {
                window.location = `${settings.root_url}/login`
            }
        })
        .catch(function (error) {
            console.log(error);
            // handle login error
            react_ins.setState({message: 'Unknown error.'}, 
                    () => setTimeout(() => react_ins.setState({message:''}),2000))
            
        })
        event.preventDefault();
    }

    render() {
        return (
            <div className='bg'>
                {this.renderMessage()}
                <div className="register-main-card">
                    <div className="form-title">Register</div>
                    <div className="register-form">
                        <form onSubmit={this.handleSubmit}>
                            <div className="register-form-group">
                                {this.validateEmailIcon()}
                                <input className={'register-form-input ' + (this.validateEmail() ? '' : 'not-valid-input')} placeholder='Email' type="text" value={this.state.account} onChange={(e) => this.handleChange('account', e)} />
                            </div>
                            <div className="register-form-group">
                                <input className='register-form-input' placeholder='Student ID ( optional )' value={this.state.student_id} onChange={(e) => this.handleChange('student_id', e)} />
                            </div>
                            <div className="register-form-group">
                                <input className='register-form-input' placeholder='Password' type="password" value={this.state.password} onChange={(e) => this.handleChange('password', e)} />
                            </div>
                            <div className="register-form-group">
                                <input className='register-form-button' type="submit" value="Submit" />
                            </div>
                        </form>
                    </div>
                {/*<button onClick={this.testClick}>test</button>*/}
                </div>
            </div>
        );
    }
}

export default Register;