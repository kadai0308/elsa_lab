import React, { Component } from 'react';
import showdown from 'showdown';
import axios from 'axios';
import './New.css'
import FontAwesome from 'react-fontawesome'
import swal from 'sweetalert2'
import  '../../../../node_modules/sweetalert2/dist/sweetalert2.css'
import settings from '../../../settings.js'

class newsNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            content: '',
            image_url: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(id, event) {
        if (id === 'title') {
            this.setState({title: event.target.value})
        } else if (id === 'description') {
            this.setState({description: event.target.value})
        } else if (id === 'image_url') {
            this.setState({image_url: event.target.value})
        } else if (id === 'content') {
            this.setState({content: event.target.value})
        }
    }

    checkForm(event){
        let reqCol = ''
        if (!this.state.title) {
            reqCol += 'title '
        }
        if (reqCol) {
            reqCol += 'is required.'
            window.alert(reqCol);
        }
    }

    handleSubmit(event){
        this.checkForm(event)
        const token = localStorage.token;
        const ins = axios.create({
            baseURL: settings.backend_url,
            timeout: 1000,
            headers: {
                Authorization: "JWT " + token,
            }
        })
        ins.post('news', this.state)
        .then((res) => {
            console.log(res)
            window.location.href='/management/news';
        })
        .catch((error) => {
            console.log(error)
        })
    }

    render() {
        let converter = new showdown.Converter()
        let previewHTML = converter.makeHtml(this.state.content);
        
        return (
            <div className="lecture-new-bg">
                <div className="news-new-main">
                    <div className="lecture-new-title">
                        Create a news
                    </div>
                    <div className='news-new-flex-box'>
                        <div className="news-new-form">
                            <div className="input-label">title</div>
                            <input className='content-new-input' type="text" onChange={(e) => this.handleChange('title', e)}/>
                            <div className="input-label">image url</div>
                            <input className='content-new-input' type="text" onChange={(e) => this.handleChange('image_url', e)}/>
                            <div className="input-label">description</div>
                            <div className='news-new-description'>
                                <textarea className='news-new-description-textarea' name="" id="" cols="30" rows="5" onChange={(e) => this.handleChange('description', e)}>
                                </textarea>
                            </div>
                            <div className="input-label">content</div>
                            <div className='news-new-content'>
                                <textarea className='news-new-content-textarea' name="" id="" cols="30" rows="5" onChange={(e) => this.handleChange('content', e)}>
                                </textarea>
                            </div>
                            <div>
                                <input onClick={this.handleSubmit} className='news-new-submit-btn' type="submit"/>
                            </div>
                        </div>
                        <div className='news-new-preview'>
                            <div className='input-label'>
                                content preview
                            </div>
                            <div className='news-new-preview-main'>
                                <div dangerouslySetInnerHTML={{ __html: previewHTML }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default newsNew;