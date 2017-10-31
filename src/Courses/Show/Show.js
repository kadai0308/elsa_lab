import React, { Component } from 'react';
import axios from 'axios';
import './Show.css'
import instructorImg from './teacher_avater/professor.jpg'
import settings from '../../settings.js'

class courseShow extends Component {
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
        const ins = axios.create({
            baseURL: settings.backend_url,
            timeout: 1000,
        })

        ins.get('courses/' + course_id)
        .then((res) => {
            console.log(res);
            this.setState({title: res.data.title, description: res.data.description})
        })
        .catch((error) => {
            console.log(error);
        })

        ins.get('courses/' + course_id + '/contents/' + content_id)
        .then((res) => {
            console.log(res);
            this.setState(res.data)
        })
        .catch((error) => {
            console.log(error);
        })
    }

    renderTAs() {
        if (this.state.TAs) {
            return this.state.TAs.map(item => (
                <div key={item.id} className='course-front-show-staff'>
                    <div className="course-front-show-staff-image">
                        <img src={item.profile.pictureUrl} alt="##"/>
                    </div>
                    <div className="course-front-show-staff-info">
                        {item.profile.name}
                    </div>
                </div>

            ))
        }
    }

    renderLectures() {
        const course_id = this.props.params.course_id
        const content_id = this.props.params.content_id
        return this.state.lectures.map((item) => (
            <div className='course-front-show-content' key={item.id}>
                <div className='course-front-show-content-title'>Lecture {item.lecture_number} - {item.title}</div>
                <div className='course-front-show-content-description'>{item.description}</div>
                {this.renderFiles(item.files, item.id)}
            </div>
        ))
    }

    renderFiles (files, lecture_id) {
        const content_id = this.props.params.content_id
        return files.map((item) => (
            <li key={item.id}><a href={content_id + '/lectures/' + lecture_id + '/files/' + item.id}>{item.title}</a></li>
        ))
    }

    render() {
        const course_id = this.props.params.course_id
        const content_id = this.props.params.content_id
        return (
            <div className="course-front-show-bg">
                <div className="course-front-show-main">
                    <div className="course-front-show-title">
                        {this.state.title}
                    </div>
                    <div className="course-front-show-subTitle">
                        {this.state.year} - {this.state.season}
                    </div>
                    <div className="course-front-show-description">
                        {this.state.description}
                    </div>
                    <div className="course-front-show-decoration-line"></div>
                    <div className="course-front-show-staffs">
                        <div className="course-front-show-staffs">
                            <div className="course-front-show-staffs-title">Instructors</div>
                            <div className="course-front-show-staffs-main">
                                <div className='course-front-show-staff'>
                                    <div className="course-front-show-staff-image">
                                        <img src={instructorImg} alt="##"/>
                                    </div>
                                    <div className="course-front-show-staff-info">
                                        Chun-Yi Lee
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="course-front-show-staffs">
                            <div className="course-front-show-staffs-title">TAs</div>
                            <div className="course-front-show-staffs-main">
                                {this.renderTAs()}
                            </div>
                        </div>
                    </div>
                    <div className="course-front-show-decoration-line"></div>
                    <div className="course-front-show-lectures">
                        {this.renderLectures()}
                    </div>
                </div>
            </div>
        )
    }
}

export default courseShow;