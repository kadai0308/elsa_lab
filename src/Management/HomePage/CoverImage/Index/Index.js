import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import './Index.css'
import settings from '../../../../settings.js'

class CoverImageIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coverImageUrls: []
        }
    }

    componentWillMount() {
        const ins = axios.create({
            baseURL: settings.backend_url,
            timeout: 1000,
            headers: {
                Authorization: "JWT " + token,
            }
        })

        ins.get('home_cover_image')
        .then((res) => {
            console.log(res);
            this.setState({news: res.data})
        })
        .catch((error) => {
            console.log(error);
        })
    }

    render() {
        return(
            <div>
                coverimage
            </div>
        )
    }
}

export default CoverImageIndex;