import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert2'
import  '../../../../../../node_modules/sweetalert2/dist/sweetalert2.css'
import './Show.css'

class lectureShow extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            year: '',
            season: '',
            course_no: '',
            location: '',
            lectures: []
        }
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

    deleteLecture (event) {
        const course_id = this.props.params.course_id
        const content_id = this.props.params.content_id
        const lecture_id = this.props.params.lecture_id
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

            ins.delete('courses/' + course_id + '/contents/' + content_id + '/lectures/' + lecture_id)
            .then((res) => {
                console.log(res);
                swal({
                    title: 'Deleted!',
                    text: 'Your lecture has been deleted.',
                    type: 'success',
                }).then(function() {
                    window.location.href='/management/courses/' + course_id + '/contents/' + content_id;
                })
            })
            .catch((error) => {
                console.log(error);
                swal(
                    'Deleted Fail',
                    'Your lecture has not been deleted.',
                    'error'
                )
            })
        })
    }

    renderFile () {
        if (this.state.files) {
            return this.state.files.map((item) => (
                <li key={item.id}><a href={item.url}>{item.title}</a></li>
            ))
        }
    }

    render() {
        const course_id = this.props.params.course_id
        const content_id = this.props.params.content_id
        const lecture_id = this.props.params.lecture_id
        return (
            <div className='lecture-show-bg'>
                <div className="lecture-show-main">
                    <div className="lecture-show-title">
                        <div className="lecture-show-title-main">
                             Lecture {this.state.lecture_number} - {this.state.title}
                        </div>
                        <div className="lecture-show-btn-group">
                            <a href="#" onClick={(e) => this.deleteLecture(e)} className="content-show-delete-btn" >delete</a>
                            <a href={"./" + lecture_id + '/edit'} className="content-show-edit-btn" >edit</a>
                        </div>
                    </div>
                    <div className="lecture-show-main-info">
                        <pre>{this.state.description}</pre>
                        <div className="files">
                            {this.renderFile()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default lectureShow;