import React, { Component } from 'react';
import axios from 'axios';
import digital from './img/hardware.jpeg'
import './Main.css'

class courseMain extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount() {
        const token = localStorage.token;
        const ins = axios.create({
            baseURL: 'http://127.0.0.1:8000/',
            timeout: 1000,
        })

        ins.get('/courses')
        .then((res) => {
            console.log(res);
            let selectState = {}
            res.data.map(item => (
                selectState[`select${item.id}`] = false
            ))
            this.setState({ courses: res.data, selectState: selectState })
        })
        .catch((error) => {
            console.log(error);
        })
    }

    hiddenToggle(id) {
        if (this.state[`select${id}`]) {
            return ''
        } else {
            return 'hidden'
        }
    }

    selectToggle(event, id) {
        let selectState = {}
        selectState[`select${id}`] = !this.state[`select${id}`]
        this.setState(selectState)
    }

    renderContent(course_id, contents) {
        return contents.map(item => (
            <a href={'courses/' + course_id + '/contents/' + item.id} className='text-decoration-none'>
                <div key={item.id} className="course-option">{item.year + ' - ' + item.season}</div>
            </a>
        ))
    }

    renderClass() {
        if (this.state.courses) {
            return this.state.courses.map(item => (
                <div className="course" key={item.id}>
                    <div className="course-img">
                        <img src={digital} alt="class-img"/>
                    </div>
                    <div className="course-content">
                        <div className="course-name">{item.title}</div>
                        <div>
                            <div onClick={(e) => this.selectToggle(e, item.id)} className='course-select'>
                                which year?
                            </div>
                            <div className={"course-options " + this.hiddenToggle(item.id)}>
                                {this.renderContent(item.id, item.contents)}
                            </div>
                        </div>
                    </div>
                </div>
            ))
        }
    }

    render() {
        return(
            <div className="course-main">
                <div className='course-title'>
                    <div>Courses</div>
                </div>
                {this.renderClass()}
            </div>
        )
    }

}

export default courseMain;