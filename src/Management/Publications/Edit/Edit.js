import React, { Component } from 'react';
import axios from 'axios';
import './Edit.css'
import Dropzone from 'react-dropzone'
import FontAwesome from 'react-fontawesome'

class publicationEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            code_url: '',
            arXiv_url: '',
            files: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        const publication_id = this.props.params.publication_id
        const token = localStorage.token;
        const ins = axios.create({
            baseURL: 'http://127.0.0.1:8000/',
            timeout: 1000,
            headers: {
                Authorization: "JWT " + token,
            }
        })

        ins.get('publications/' + publication_id)
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
        } else if (id === 'code_url') {
            this.setState({code_url: event.target.value})
        } else if (id === 'arXiv_url') {
            this.setState({arXiv_url: event.target.value})
        }

    }

    handleSubmit(event){
        const publication_id = this.props.params.publication_id
        const token = localStorage.token;
        const ins = axios.create({
            baseURL: 'http://127.0.0.1:8000/',
            timeout: 1000,
            headers: {
                Authorization: "JWT " + token,
            }
        })
        ins.put(`publications/${publication_id}`, this.state)
        .then((res) => {
            console.log(res)
            window.location.href=`/management/publications`;
        })
        .catch((error) => {
            console.log(error)
        })
    }

    onDrop(file) {
        if (this.state.files) {
            alert('最多上傳一個檔案');
            return;
        }
        let files = []
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

    delFile(event) {
        const publication_id = this.props.params.publication_id
        // delete file from backend
        const token = localStorage.token;
        const ins = axios.create({
            baseURL: 'http://127.0.0.1:8000/',
            timeout: 1000,
            headers: {
                Authorization: "JWT " + token,
            }
        })

        ins.delete('publications/' + publication_id + '/file')
        .then((res) => {
            console.log(res);
        })
        .catch((error) => {
            console.log(error);
        })
        // delete file from react state
        this.setState({
          files: ''
        });
    }

    renderFileInfo() {
        if (this.state.files) {
            return (
                <div className='lecture-new-file-block'> 
                    <div className="lecture-new-file-icon-group">
                        <FontAwesome 
                            className='lecture-new-file-delete-icon'
                            name='times-circle-o'
                            onClick={e => this.delFile(e)}
                        />
                        <FontAwesome 
                            className='lecture-new-file-icon' 
                            name='file-o'
                        />
                    </div>
                    <div className="lecture-new-file-info">
                        {this.state.title}
                    </div>
                </div>
            )
        }
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
                        <div className="input-label">code url</div>
                        <input value={this.state.code_url} className='content-new-input' type="text" onChange={(e) => this.handleChange('code_url', e)}/>
                        <div className="input-label">arXiv url</div>
                        <input value={this.state.arXiv_url} className='content-new-input' type="text" onChange={(e) => this.handleChange('arXiv_url', e)}/>
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

export default publicationEdit;