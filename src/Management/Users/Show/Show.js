import React, { Component } from 'react';
import axios from 'axios';
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
            baseURL: 'http://127.0.0.1:8000/',
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