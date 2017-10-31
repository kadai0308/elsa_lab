import React, { Component, PropTypes } from 'react';

class logOut extends Component {

    componentDidMount() {
        delete localStorage.token;
        delete localStorage.user_id;
        this.props.router.push('/');
    }

    render() {
        return (<div>Logging out...</div>);
    }
}

logOut.propTypes = {
  router: PropTypes.object.isRequired
};

export default logOut