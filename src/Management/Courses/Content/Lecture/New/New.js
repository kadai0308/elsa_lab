import React, { Component } from 'react';
import axios from 'axios';
import './New.css'
import Dropzone from 'react-dropzone'
import FontAwesome from 'react-fontawesome'
import settings from '../../../../../settings.js'

class lectureNew extends Component {
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
        const token = localStorage.token;
        const ins = axios.create({
            baseURL: settings.backend_url,
            timeout: 1000,
            headers: {
                Authorization: "JWT " + token,
            }
        })
        ins.post(`courses/${course_id}/contents/${content_id}/lectures`, this.state)
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
        let files = this.state.files
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
                        onClick={e => this.delFile(index, e)}
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
                        <input className='content-new-input' type="text" onChange={(e) => this.handleChange('title', e)}/>
                        <div className="input-label">description</div>
                        <textarea className='input-textarea' name="" id="" cols="30" rows="10" onChange={(e) => this.handleChange('description', e)}></textarea>
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

export default lectureNew;