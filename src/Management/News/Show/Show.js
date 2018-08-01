import React, { Component } from 'react';
import showdown from 'showdown';
import axios from 'axios';
import swal from 'sweetalert2'
import  '../../../../node_modules/sweetalert2/dist/sweetalert2.css'
import './Show.css'
import settings from '../../../settings.js'

class newsShow extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            title: '',
        }
    }

    componentWillMount() {
        const news_id = this.props.params.news_id
        const token = localStorage.token;
        const ins = axios.create({
            baseURL: settings.backend_url,
            timeout: 1000,
            headers: {
                Authorization: "JWT " + token,
            }
        })

        ins.get('news/' + news_id)
        .then((res) => {
            console.log(res);
            this.setState(res.data)
        })
        .catch((error) => {
            console.log(error);
        })
    }

    deletePublication (event) {
        const news_id = this.props.params.news_id
        swal({
          title: 'Are you sure?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then(function () {
            const token = localStorage.token;
            const ins = axios.create({
                baseURL: settings.backend_url,
                timeout: 1000,
                headers: {
                    Authorization: "JWT " + token,
                }
            })

            ins.delete('news/' + news_id)
            .then((res) => {
                console.log(res);
                swal({
                    title: 'Deleted!',
                    text: 'Your content has been deleted.',
                    type: 'success',
                }).then(function() {
                    window.location.href='/management/news';
                })
            })
            .catch((error) => {
                console.log(error);
                swal(
                    'Deleted Fail',
                    'Your publication has not been deleted.',
                    'error'
                )
            })
        })
    }

    render() {
        const news_id = this.props.params.news_id
        
        let converter = new showdown.Converter()
        const contentHTML = converter.makeHtml(this.state.content);
        
        function outpageImageStyle(imageUrl) {
            return ({
                position: 'relative',
                width: '35%',
                backgroundImage: `url("${imageUrl}")`,
                backgroundPosition: 'center',
                backgroundSize: 'cover'
            })
        }

        return (
            <div className='content-show-bg'>
                <div className="news-show-main">
                    <div className="content-show-title">
                        <div className="content-show-title-main">
                            {this.state.title}
                        </div>
                        <div className="content-show-btn-group">
                            <a href="#" onClick={(e) => this.deletePublication(e)} className="content-show-delete-btn" >delete</a>
                            <a href={"./" + news_id + '/edit'} className="content-show-edit-btn" >edit</a>
                        </div>
                    </div>
                    <div className="news-show-outpage-preview">
                        <div className="news-show-main-title">
                            outpage preview:
                        </div>
                        <div className="latest-news">
                            <div style={outpageImageStyle(this.state.image_url)}></div>
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
                    <div className="news-show-mainpage-preview">
                        <div className="news-show-main-title">
                            mainpage preview:
                        </div>
                        <div className="news-show-mainpage-preview-content">
                            <div dangerouslySetInnerHTML={{ __html: contentHTML }} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default newsShow;