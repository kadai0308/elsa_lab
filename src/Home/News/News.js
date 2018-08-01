import React, {Component} from 'react';
import './News.css';
import axios from 'axios';
import settings from '../../settings.js'
class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      image_url: "",
    }
  }

  componentWillMount() {
    const token = localStorage.token;
    const ins = axios.create({
        baseURL: settings.backend_url,
        timeout: 1000,
    })

    ins.get(`news?order=-created_at`)
    .then((res) => {
        console.log(res);
        this.setState(res.data[0])
    })
    .catch((error) => {
        console.log(error);
    })
  }

  render() {
    return (
      <div className="news">
        <div className='news-title'>
          <div>News</div>
        </div>
      <div className="latest-news">
        <div className="img" style={{
          backgroundImage: "url('" + this.state.image_url + "')"
        }}></div>
        <div className="news-main">
          <div className="title">
            {this.state.title}
          </div>
          <div className="content">
            {this.state.description}
          </div>
          </div>
        </div>
      </div>
    )
  }
}

export default News;