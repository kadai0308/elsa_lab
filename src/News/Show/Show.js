import React, {Component} from 'react';
import './Show.css'
import axios from 'axios';
import settings from '../../settings.js'
import showdown from 'showdown';

class newsShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: "",
        }
    }

    componentWillMount() {
        const newsId = this.props.params.news_id
        const token = localStorage.token;
        const ins = axios.create({
            baseURL: settings.backend_url,
            timeout: 1000,
        })
    
        ins.get(`news/${newsId}`)
        .then((res) => {
            console.log(res);
            this.setState({news: res.data})
        })
        .catch((error) => {
            console.log(error);
        })
    }

    render() {
        let converter = new showdown.Converter()
        let previewHTML = converter.makeHtml(this.state.news.content);

        return (
            <div className="news-show-bg">
                <div className="news-show-main">
                    <div className="news-show-title">
                        <div className="news-show-title-main">
                            {this.state.news.title}
                        </div>
                    </div>
                    <div className="news-show-image-main" style={{
                        backgroundImage: 'url("' + this.state.news.image_url + '")'
                    }}></div>
                    <div className="news-show-content-main">
                        <div dangerouslySetInnerHTML={{ __html: previewHTML }} />
                    </div>
                </div>
            </div>
        )
    }
}

export default newsShow