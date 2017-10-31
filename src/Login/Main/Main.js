import React, { Component } from 'react';
import axios from 'axios';

class loginMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            password: '',
            token: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.testClick = this.testClick.bind(this);
    }

    handleChange(id, event) {
        if (id === 'account') {
            this.setState({account: event.target.value});
        } else if (id === 'password') {
            this.setState({password: event.target.value});
        }
    }

    handleSubmit(event) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {
            username: this.state.account,
            password: this.state.password
        })
        .then(function (response) {
            console.log(response);
            const user_id = response.data.user.id;
            localStorage.token = response.data.token;
            localStorage.user_id = user_id
            // redirect to user page
            window.location = `http://127.0.0.1:3000/management/users`
        })
        .catch(function (error) {
            console.log(error);
            // handle login error
        })
        event.preventDefault();
    }

    // testClick(event) {
    //     const token = this.readCookie('token');

    //     var instance = axios.create({
    //         baseURL: 'http://127.0.0.1:8000/',
    //         timeout: 1000,
    //         headers: {
    //             Authorization: "JWT " + token,
    //         }
    //     });

    //     instance.get('users/3/')
    //     .then(function (response) {
    //         console.log(response);
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     })
    // }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    Account:
                    <input type="text"  value={this.state.account} onChange={(e) => this.handleChange('account', e)} />
                    Password:
                    <input type="text" value={this.state.password} onChange={(e) => this.handleChange('password', e)} />
                    <input type="submit" value="Submit" />
                </form>
                {/*<button onClick={this.testClick}>test</button>*/}
            </div>
        );
    }
}

export default loginMain;