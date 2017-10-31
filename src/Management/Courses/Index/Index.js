import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import './Index.css'

class courseIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: []
        }
    }

    componentWillMount() {
        const token = localStorage.token;
        const ins = axios.create({
            baseURL: 'http://127.0.0.1:8000/',
            timeout: 1000,
            headers: {
                Authorization: "JWT " + token,
            }
        })

        ins.get('courses')
        .then((res) => {
            console.log(res);
            this.setState({courses: res.data})
        })
        .catch((error) => {
            console.log(error);
        })
    }

    render() {
        let courses = this.state.courses.map((item) => (
                <div className="course-index-course" key={item.id}>
                    <div className="course-index-course-title">
                        <a href={"/management/courses/" + item.id} className="course-index-course-link" >{item.title}</a>
                    </div>
                </div>
            ))

        return(
            <div className='course-index-bg'>
                <div className="course-index-main">
                    <div className='course-index-btn-group'>
                        <Link className='course-index-link-btn' to="/management/course/new">add course</Link>
                    </div>
                    <div className="course-index-courses">
                        <div className="course-index-courses">
                            {courses}        
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default courseIndex;