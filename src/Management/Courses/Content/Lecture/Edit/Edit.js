import React, { Component } from 'react';
import axios from 'axios';
import './Edit.css'
import Dropzone from 'react-dropzone'
import FontAwesome from 'react-fontawesome'

class lectureEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            files: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        const course_id = this.props.params.course_id
        const content_id = this.props.params.content_id
        const lecture_id = this.props.params.lecture_id
        const token = localStorage.token;
        const ins = axios.create({
            baseURL: 'http://127.0.0.1:8000/',
            timeout: 1000,
            headers: {
                Authorization: "JWT " + token,
            }
        })

        ins.get('courses/' + course_id + '/contents/' + content_id + '/lectures/' + lecture_id)
        .then((res) => {
            console.log(res);
            this.setState(res.data)
        })
        .catch((error) => {
            console.log(error);
        })
    }

    handleChange(id, event) {
        if (id === 'title') {
            this.setState({title: event.target.value})
        } else if (id === 'description') {
            this.setState({description: event.target.value})
        }
    }

    handleSubmit(event){
        const course_id = this.props.params.course_id
        const content_id = this.props.params.content_id
        const lecture_id = this.props.params.lecture_id
        const token = localStorage.token;
        const ins = axios.create({
            baseURL: 'http://127.0.0.1:8000/',
            timeout: 1000,
            headers: {
                Authorization: "JWT " + token,
            }
        })
        ins.put(`courses/${course_id}/contents/${content_id}/lectures/${lecture_id}`, this.state)
        .then((res) => {
            console.log(res)
            window.location.href=`/management/courses/${course_id}/contents/${content_id}`;
        })
        .catch((error) => {
            console.log(error)
        })
    }

    onDrop(file) {
        let files = this.state.files
        let reader = new FileReader();
        let rea = this
        reader.onload = function(){
            files.push({
                title: file[0].name,
                preview: file[0].preview,
                size: file[0].size,
                type: file[0].type,
                data: reader.result
            })
            rea.setState({
              files
            });
        }
        reader.readAsDataURL(file[0]);
    }

    delFile(index, event) {
        let file_id;
        let files = this.state.files
        // delete file from backend
        if (files[index].id) {
            file_id = files[index].id
            const token = localStorage.token;
            const ins = axios.create({
                baseURL: 'http://127.0.0.1:8000/',
                timeout: 1000,
                headers: {
                    Authorization: "JWT " + token,
                }
            })

            ins.delete('files/' + file_id)
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            })
        }
        // delete file from react state
        files.splice(index, 1)
        this.setState({
          files
        });
    }

    renderFileInfo() {
        return this.state.files.map((f, index) => (
            <div key={index} className='lecture-new-file-block'> 
                <div className="lecture-new-file-icon-group">
                    <FontAwesome 
                        className='lecture-new-file-delete-icon'
                        name='times-circle-o'
                        onClick={e => this.delFile(index, e)}
                    />
                    <FontAwesome 
                        className='lecture-new-file-icon' 
                        name='file-o'
                    />
                </div>
                <div className="lecture-new-file-info">
                    {f.title}
                </div>
            </div>
        ))
    }

    render() {
        return (
            <div className="lecture-new-bg">
                <div className="lecture-new-main">
                    <div className="lecture-new-title">
                        New A Lecture
                    </div>
                    <div className="lecture-new-form">
                        <div className="input-label">title</div>
                        <input value={this.state.title} className='content-new-input' type="text" onChange={(e) => this.handleChange('title', e)}/>
                        <div className="input-label">description</div>
                        <textarea value={this.state.description} className='input-textarea' name="" id="" cols="30" rows="10" onChange={(e) => this.handleChange('description', e)}></textarea>
                        <div className="input-label">Upload File: by dropping file into the block or clicking button</div>
                        <div className="lecture-new-upload">
                            <Dropzone className='lecture-new-upload-area-main' onDrop={this.onDrop.bind(this)}></Dropzone>
                            <Dropzone className='lecture-new-upload-area-icon' onDrop={this.onDrop.bind(this)}></Dropzone>
                            <div className="lecture-new-uploaded-files">
                                {this.renderFileInfo()}
                            </div>
                        </div>
                        <div>
                            <input onClick={this.handleSubmit} className='lecture-new-submit-btn' type="submit"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default lectureEdit;