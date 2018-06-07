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
                <div className='brand-container'>
                    <div className="brand-image">
                        <IndexLink to='#' className='brand'>Elsa Lab Control Panel</IndexLink>
                    </div>
                </div>
                <div className="urls-control-panel">
                    <div className="urls-container">    
                        <Link to='/management/users' className="url">
                            <div className="url-box url-box-control-panel url-box-border">
                                Users
                            </div>
                        </Link>
                        <Link to='/management/courses' className="url">
                            <div className="url-box url-box-control-panel url-box-border">Courses</div>
                        </Link>
                        <Link to='/management/Publications' className="url"><div className="url-box url-box-control-panel url-box-border">Publications</div></Link>
                        <Link to='/management/News' className="url"><div className="url-box url-box-control-panel url-box-border">News</div></Link>
                        <Link to='/' className="url">
                            <div className="url-box url-box-control-panel">Exit</div>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
};

export default Management;