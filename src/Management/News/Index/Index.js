import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import './Index.css'
import settings from '../../../settings.js'

class NewsIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: []
        }
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

        ins.get('news')
        .then((res) => {
            console.log(res);
            this.setState({news: res.data})
        })
        .catch((error) => {
            console.log(error);
        })
    }

    render() {
        let news = this.state.news.map((item) => (
                <div className="course-index-course" key={item.id}>
                    <div className="course-index-course-title">
                        <a href={"/management/news/" + item.id} className="course-index-course-link" >{item.title}</a>
                    </div>
                </div>
            ))

        return(
            <div className='course-index-bg'>
                <div className="course-index-main">
                    <div className='course-index-btn-group'>
                        <Link className='course-index-link-btn' to="/management/news/new">add news</Link>
                    </div>
                    <div className="course-index-courses">
                        <div className="course-index-courses">
                            {news}        
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsIndex;