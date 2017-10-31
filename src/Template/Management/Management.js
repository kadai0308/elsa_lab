import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';

class Management extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logIn: ''
        }        
    }

    logOut() {
        delete localStorage.token;
        delete localStorage.user_id;
        location.reload();
    }

    componentWillMount() {
        const token = localStorage.token;
        if (token) {
            this.setState({logIn: true});
        }
    }

    render() {

        return (
            <div className="header">
                <IndexLink to='/' className='brand'>Elsa Lab</IndexLink>
                <Link to='/management/users' className="item url">Users</Link>
                <Link to='/management/courses' className="item url">Courses</Link>
                <Link to='/management/Publications' className="item url">Publications</Link>
                <Link to='#' onClick={this.logOut} className="item url">Log out</Link>
            </div>
        )
    }
};

export default Management;