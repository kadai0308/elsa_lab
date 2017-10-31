import React, { Component } from 'react';
import axios from 'axios';
import './New.css'

class userNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            name: '',
            pictureUrl: '',
            studentType: '',
            researchArea: '',
            selfIntro: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(id, event) {
        if (id === 'username') {
            this.setState({username: event.target.value})
        } else if (id === 'name') {
            this.setState({name: event.target.value})
        } else if (id === 'pictureUrl') {
            this.setState({pictureUrl: event.target.value})
        } else if (id === 'studentType') {
            this.setState({studentType: event.target.value})
        } else if (id === 'researchArea') {
            this.setState({researchArea: event.target.value})
        } else if (id === 'selfIntro') {
            this.setState({selfIntro: event.target.value})
        }
    }

    checkForm(event){
        let reqCol = ''
        if (!this.state.username) {
            reqCol += 'username '
        }
        if (!this.state.name) {
            reqCol += 'name '    
        }
        if (!this.state.studentType) {
            reqCol += 'studentType '
        }
        if (reqCol) {
            reqCol += 'is required.'
            window.alert(reqCol);
        }
    }

    handleSubmit(event){
        this.checkForm(event)

        const token = localStorage.token;
        const ins = axios.create({
            baseURL: 'http://127.0.0.1:8000/',
            timeout: 1000,
            headers: {
                Authorization: "JWT " + token,
            }
        })
        ins.post('users', this.state)
        .then((res) => {
            console.log(res)
            window.location.href='/management/users';
        })
        .catch((error) => {
            console.log(error)
        })
    }

    render() {
        return (
            <div className='user-new-bg'>
                <div className='user-new-main'>
                    <div className='user-new-title'>New A User</div>
                    <div className='user-new-form'>
                        <div className='input-group-flex'>
                            <div className='input-group-left-60'>
                                <div className='input-label'>username:</div>
                                <input type="text" onChange={(e) => this.handleChange('username', e)}/>
                                <div className='input-label'>name:</div>
                                <input type="text" onChange={(e) => this.handleChange('name', e)}/>
                                <div className='input-label'>picture url:</div>
                                <input type="text" onChange={(e) => this.handleChange('pictureUrl', e)}/>
                                <div className='input-label'>student type:</div>
                                <select className='input-select' onChange={(e) => this.handleChange('studentType', e)}>
                                    <option value="">choose type</option>
                                    <option value="College">College</option>
                                    <option value="Master">Master</option>
                                    <option value="PHD">PHD</option>
                                </select>
                            </div>
                            <div className='input-group-right-40 text-align-center'>
                                <img className='user-new-avater' alt='圖片網址錯誤' src={this.state.pictureUrl} />
                            </div>
                        </div>
                        <div>
                            <div className='input-label'>Research Area</div>
                            <textarea className='input-textarea' name="" id="" cols="30" rows="10" onChange={(e) => this.handleChange('researchArea', e)}></textarea>
                            <div className='input-label'>Self Intro</div>
                            <textarea className='input-textarea' name="" id="" cols="30" rows="10" onChange={(e) => this.handleChange('selfIntro', e)}></textarea>
                        </div>
                        <input className='user-new-submit-btn' type="submit" onClick={this.handleSubmit}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default userNew;