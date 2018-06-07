import React, { Component } from 'react';
import './Comment.css';
import axios from 'axios';
import settings from '../../../settings.js';
import showdown from 'showdown';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'comments': '',
            'content': '', // question content
            'fileId': props.fileId,
            'nowPage': props.nowPage,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        // reset state
        this.setState({nowPage: this.state.nowPage})
        // if login load all comments under this page
        this.loadComment()
        // else render login only message
    }

    renderCommentForm() {
        const token = localStorage.token;
        if (token) {
            return (
                <div className="comment-form">
                    <div className="comment-input-grpup">
                        <textarea name="" id="" cols="30" rows="5" placeholder='你想問什麼呢？' value={this.state.content} onChange={(e) => this.handleChange('q_content', e)}></textarea>
                    </div>
                    <input onClick={this.handleSubmit} type="submit" value='send' />
                </div>
            )
        } else {
            return (<div><a href="/login">登入</a>後才能留言喔！</div>)
        }
    }

    loadComment() {
        const token = localStorage.token;
        // if login load all comments under this page
        const fileId = this.state.fileId
        const nowPage = this.state.nowPage
        const ins = axios.create({
            baseURL: settings.backend_url,
            timeout: 1000,
            headers: {
                Authorization: "JWT " + token,
            }
        })

        ins.get('files/' + fileId + '/pages/' + nowPage)
        .then((res) => {
            console.log(res);
            this.setState({comments: res.data});
            
        })
        .catch((error) => {
            console.log(error);
        })
    }

    handleChange(id, event) {
        if (id === 'q_content') {
            this.setState({content: event.target.value});
        }
    }

    handleSubmit(event) {
        const fileId = this.state.fileId;
        const nowPage = this.state.nowPage;
        const token = localStorage.token;
        const ins = axios.create({
            baseURL: settings.backend_url,
            timeout: 1000,
            headers: {
                Authorization: "JWT " + token,
            }
        })
        ins.post(`files/${fileId}/pages/${nowPage}`, this.state)
        .then((res) => {
            console.log(res)
            this.setState({content: ''})
            this.loadComment()
        })
        .catch((error) => {
            console.log(error)
        })
    }

    render() {
        let comments;
        let converter = new showdown.Converter()
        commentsHTML = this.state.comments.map((comment, index) => (
            converter.makeHtml(comment.content)
        ))

        console.log(commentsHTML);

        if (this.state.comments) {
            comments = this.state.comments.map((comment, index) => (
                    <div className="comment">
                        <div className="author">{comment.author.username}</div>
                        <div dangerouslySetInnerHTML={{__html: comments[i]}} />
                    </div>
                ))
        }

        return (
            <div className="comments">
                <div className="title">Page {this.state.nowPage}  - 討論區</div>
                <div className="comment-main">
                    {comments}
                    {this.renderCommentForm()}
                </div>
            </div>
        )
    }
}

export default Comment;