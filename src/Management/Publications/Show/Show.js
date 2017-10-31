import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert2'
import  '../../../../node_modules/sweetalert2/dist/sweetalert2.css'
import './Show.css'

class publicationShow extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            title: '',
            code_url: '',
            arXiv_url: '',
            files: '',
        }
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

    deletePublication (event) {
        const publication_id = this.props.params.publication_id
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
                baseURL: 'http://127.0.0.1:8000/',
                timeout: 1000,
                headers: {
                    Authorization: "JWT " + token,
                }
            })

            ins.delete('publications/' + publication_id)
            .then((res) => {
                console.log(res);
                swal({
                    title: 'Deleted!',
                    text: 'Your content has been deleted.',
                    type: 'success',
                }).then(function() {
                    window.location.href='/management/publications';
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
        const publication_id = this.props.params.publication_id
        return (
            <div className='content-show-bg'>
                <div className="content-show-main">
                    <div className="content-show-title">
                        <div className="content-show-title-main">
                            {this.state.title}
                        </div>
                        <div className="content-show-btn-group">
                            <a href="#" onClick={(e) => this.deletePublication(e)} className="content-show-delete-btn" >delete</a>
                            <a href={"./" + publication_id + '/edit'} className="content-show-edit-btn" >edit</a>
                        </div>
                    </div>
                    <div className="content-show-main-info">
                        <div>code url: {this.state.code_url}</div>
                        <div>arXiv url: {this.state.arXiv_url}</div>
                        pdf: <a href={this.state.files.url} className="">{this.state.title}</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default publicationShow;