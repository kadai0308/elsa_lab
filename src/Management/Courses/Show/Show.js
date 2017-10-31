import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert2'
import  '../../../../node_modules/sweetalert2/dist/sweetalert2.css'
import './Show.css'
import settings from '../../../settings.js'

class courseShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            contents: '',
            description: ''
        }
    }

    componentWillMount() {
        const course_id = this.props.params.course_id
        const token = localStorage.token;
        const ins = axios.create({
            baseURL: settings.backend_url,
            timeout: 1000,
            headers: {
                Authorization: "JWT " + token,
            }
        })

        ins.get('courses/' + course_id)
        .then((res) => {
            console.log(res);
            this.setState(res.data)
        })
        .catch((error) => {
            console.log(error);
        })
    }

    deleteCourse (event) {
        const course_id = this.props.params.course_id
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

            ins.delete('courses/' + course_id)
            .then((res) => {
                console.log(res);
                swal({
                    title: 'Deleted!',
                    text: 'Your file has been deleted.',
                    type: 'success',
                }).then(function() {
                    window.location.href='/management/courses';
                })
            })
            .catch((error) => {
                console.log(error);
                swal(
                    'Deleted Fail',
                    'Your file has not been deleted.',
                    'error'
                )
            })
        })
    }

    render() {
        let contents;
        const course_id = this.props.params.course_id
        if (this.state.contents) {
            contents = this.state.contents.map((item) => (
                    <div className='course-show-content' key={item.id}>
                        <a className='course-show-content-link' href={`/management/courses/${course_id}/contents/${item.id}`}>
                            <div>year: {item.year} - {item.season}</div>
                            <div>location: {item.location}</div>
                            <div>course_no: {item.course_no}</div>
                            <div>......</div>
                        </a>
                    </div>
                ))
        }
        return (
            <div className='course-show-bg'>
                <div className="course-show-main">
                    <div className="course-show-title">
                        <div className="course-show-title-main">
                            {this.state.title}
                        </div>
                        <div className="course-show-btn-group">
                            <a href="#" onClick={(e) => this.deleteCourse(e)} className="course-show-delete-btn" >delete</a>
                            <a href={"./" + course_id + '/edit'} className="course-show-edit-btn" >edit</a>
                        </div>
                    </div>
                    <div className="course-show-main-info">
                        <pre className="course-show-description">{this.state.description}</pre>
                        <div className='course-btn-group'>
                            <a className="course-show-link-btn" href={"./" + course_id + "/contents/new"}>add content</a>
                        </div>
                        <div className="course-show-contents">
                            {contents}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default courseShow;