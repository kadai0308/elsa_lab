import React, {Component} from 'react';
import './Main.css'
import axios from 'axios';
import settings from '../../../settings.js'

class newsMain extends Component {
    constructor(props) {
        super(props)
        this.state = {
            news: []
        }
    }

    componentWillMount() {
        const token = localStorage.token;
        const ins = axios.create({
            baseURL: settings.backend_url,
            timeout: 1000,
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
        let newsHTML;
        if (this.state.news) {
            newsHTML = this.state.news.map((n) => (
                <div className="news-block" key={n.id}>
                    <div className="news-frame">
                        <a href={"/news/" + n.id} className="news-img-link">
                            <div className="news-img" style={{
                                backgroundImage: 'url("' + n.image_url + '")',
                            }}></div>
                        </a>
                        <div className="news-main">
                            <div className="news-title">
                                <a href={"/news/" + n.id} className="news-link">
                                    {n.title}
                                </a>
                            </div>
                            <div className="news-content">
                                {n.description}
                            </div>
                        </div>
                    </div>
                </div>
            ))
        }
        
        return (
            <div>
                {newsHTML}
            </div>
        )        
    }
}

export default newsMain