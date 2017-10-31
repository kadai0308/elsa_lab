import React, { Component } from 'react';
import axios from 'axios';
import './New.css'
import settings from '../../../../settings.js'

class contentNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: '',
            course_no: '',
            year: '',
            season: '',
            time: '',
            ta_ids: [],
            ta_names: [],
            users: ''
        }
        this.test = {}
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleChange(id, event) {
        if (id === 'location') {
            this.setState({location: event.target.value})
        } else if (id === 'year') {
            this.setState({year: event.target.value})
        } else if (id === 'course_no') {
            this.setState({course_no: event.target.value})
        } else if (id === 'season') {
            this.setState({season: event.target.value})
        } else if (id === 'time') {
            this.setState({time: event.target.value})
        }
    }

    handleSubmit(event){
        const course_id = this.props.params.course_id
        const token = localStorage.token;
        const ins = axios.create({
            baseURL: settings.backend_url,
            timeout: 1000,
            headers: {
                Authorization: "JWT " + token,
            }
        })
        ins.post(`courses/${course_id}/contents`, this.state)
        .then((res) => {
            console.log(res)
            window.location.href=`/management/courses/${course_id}`;
        })
        .catch((error) => {
            console.log(error)
        })
    }

    addTaToggle(user_id, user_name, event) {
        let ta_ids = this.state.ta_ids;
        let ta_names = this.state.ta_names;
        const user_id_index = ta_ids.indexOf(user_id)
        if (user_id_index === -1) {
            ta_ids.push(user_id)
            ta_names.push(user_name)
        } else {
            ta_ids.splice(user_id_index, 1)
            ta_names.splice(user_id_index, 1)
        }
        this.setState({ta_ids: ta_ids, ta_names: ta_names})
    }

    mapUser(user) {
        if (['College', 'Master', 'PHD'].indexOf(user.profile.studentType) !== -1) {
            let chosen;
            if (this.state.ta_ids.indexOf(user.id) !== -1) {
                chosen = "content-new-avater-chosen"
            }
            return (
                <div className='content-new-user' key={user.id}>
                        <img src={user.profile.pictureUrl} alt="" className={'content-new-avater ' + chosen} onClick={(e) => this.addTaToggle(user.id, user.profile.name, e)}/>
                        <div className='content-new-user-info'>{user.profile.name}</div>
                        <div className='content-new-user-info'>{user.profile.studentType}</div>
                </div>
            )
        }
    }

    chosenTaNames() {
        let ta_names;
        if (this.state.ta_names.length > 0) {
            ta_names = this.state.ta_names.map((item) => (
                <span key={item}>{item}、</span>
            ))
        } else {
            ta_names = <span>還未選擇</span>
        }
        return ta_names
    }

    render() {
        let users;
        if (this.state.users) {
            users = this.state.users.map((item) => (
                this.mapUser(item)
            ))
        }

        return (
            <div className="content-new-bg">
                <div className="content-new-main">
                    <div className="content-new-title">
                        New A Content
                    </div>
                    <div className="content-new-form">
                        <div className='content-new-input-group'>
                            <div className='input-group-right-40'>
                                <div className="input-label">year</div>
                                <input className='content-new-input' type="text" onChange={(e) => this.handleChange('year', e)}/>
                                <div className="input-label">season</div>
                                <select className='content-new-select' onChange={(e) => this.handleChange('season', e)}>
                                    <option value="">choose type</option>
                                    <option value="Spring">Spring</option>
                                    <option value="Fall">Fall</option>
                                </select>
                                <div className="input-label">course_no</div>
                                <input className='content-new-input' type="text" onChange={(e) => this.handleChange('course_no', e)}/>
                                <div className="input-label">time</div>
                                <input className='content-new-input' type="text" onChange={(e) => this.handleChange('time', e)}/>
                                <div className="input-label">location</div>
                                <input className='content-new-input' type="text" onChange={(e) => this.handleChange('location', e)}/>
                            </div>
                            <div className='input-group-left-60'>
                                <div className="content-new-ta">
                                    <div className="content-new-ta-title">
                                        Add TA: {this.chosenTaNames()}
                                    </div>
                                    <div className="content-new-ta-main">
                                        {users}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <input onClick={this.handleSubmit} className='content-new-submit-btn' type="submit"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default contentNew;
