import React, { Component } from 'react';
import Front from './Front/Front';
import Management from './Management/Management';
import './Template.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css'; 
import settings from '../settings.js'
import axios from 'axios';

class Template extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount() {
        const user_id = localStorage.user_id;
        const token = localStorage.token;
        const path = this.props.location.pathname;
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
                // if user not in root_user_types redirect to '/'
                if (path.includes('management') && !settings.root_user_types.includes(res.data.profile.studentType)) {
                    window.location = '/';       
                }
            })
            .catch((error) => {
                console.log(error);
                this.setState({logIn: false})
            })
        } else if (path.includes('management')) {
            // if user not in root_user_types redirect to '/'
            window.location = '/';
        }
    }

    render () {
        let header;
        const path = this.props.location.pathname;
        if (path.includes('management')) {
            header = <Management />;
        } else {
            header = <Front />;
        }

        return (
            <div>
                {header}
                <div className="main">
                    {this.props.children}
                </div>
                <div className="footer">
                    <div className="content">
                        <div className="copyright">© 2017 Elsa Lab Limited</div>
                    </div>
                </div>
            </div>
        )
    }

}

Template.propTypes = {
  params: React.PropTypes.object,
};

export default Template;