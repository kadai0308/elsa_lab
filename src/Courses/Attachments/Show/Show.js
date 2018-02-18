import React, { Component } from 'react';
import axios from 'axios';
import './Show.css'
import settings from '../../../settings.js'
import Comment from './Comment/Comment.js'

class Show extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount() {
        const file_id = this.props.params.file_id
        const ins = axios.create({
            baseURL: settings.backend_url,
            timeout: 1000,
        })

        ins.get('files/' + file_id)
        .then((res) => {
            console.log(res);
            this.setState(res.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    slideLinkAndInfo() {
        const page_num = parseInt(this.props.params.page_num)
        
        //產生下一頁與上一頁 url 
        const nowUrl = this.props.location.pathname
        let nowUrlSplitArray = nowUrl.split('/')
        let nextUrlSplitArray = nowUrlSplitArray.slice()
        let prevUrlSplitArray = nowUrlSplitArray.slice()
        nextUrlSplitArray[nextUrlSplitArray.length-1] = page_num + 1
        prevUrlSplitArray[prevUrlSplitArray.length-1] = page_num - 1
        const nextUrl = nextUrlSplitArray.join('/')
        const prevUrl = prevUrlSplitArray.join('/')

        let prev = page_num === 0 ? null : (<a href={prevUrl}>prev</a>)
        let next = page_num === this.state.page_size ? null : (<a href={nextUrl}>next</a>)
        return (
            <div>
                {prev}
                <span> | </span>
                {next}
                <span className='slide-info'>slides {page_num+1} of {this.state.page_size}</span>
            </div>
        )
    }

    render () {
        const page_num = this.props.params.page_num;
        return (
            <div className='slide-main'>
                <img className='slide' src={this.state.image_root_url + `/page-${page_num}.jpeg`} />
                {this.slideLinkAndInfo()}
                <Comment fileId={this.props.params.file_id} nowPage={page_num} />
            </div>
        )
    }
}

export default Show;