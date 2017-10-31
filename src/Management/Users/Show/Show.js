import React, { Component } from 'react';
import axios from 'axios';
import settings from '../../../settings.js'
// import './show.css';

class userShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        }
    }

    componentWillMount() {
        // initial data
        const user_id = this.props.params.user_id;
        const token = localStorage.token;
        const ins = axios.create({
            baseURL: settings.backend_url,
            timeout: 1000,
            headers: {
                Authorization: "JWT " + token,
            }
        })

        ins.get(`user/${user_id}`)
        .then((res) => {
            console.log(res)
            this.setState({username: res.data.username})
        })
        .catch((error) => {
            console.log(error)
        })

    }

    render () {
        return (
            <div>username: {this.state.username}</div>
        )
    }
}

export default userShow;