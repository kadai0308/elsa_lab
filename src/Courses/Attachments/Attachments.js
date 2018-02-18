import React, { Component } from 'react';
import PDFJS from 'pdfjs-dist';
import axios from 'axios';
import './Attachments.css'
import settings from '../../settings.js'

// jpeg version
class Attachments extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillMount() {
        const file_id = this.props.params.file_id
        const ins = axios.create({
            baseURL: settings.backend_url,
            timeout: 1000,
        })

        ins.get('files/' + file_id)
        .then((res) => {
            console.log(res);
            this.setState(res.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    componentDidMount() {
    }

    render() {
        const file_id = this.props.params.file_id
        let slides = []
        for (var i = 0; i < this.state.page_size; i++) {
            slides.push(
                <a href={file_id + '/pages/' + i}>
                    <img className="slide-thumbnail" src={this.state.image_root_url + `/page-${i}.jpeg`} />
                </a>
            );
        }

        return (
            <div>
                <div className="attachment-title">{this.state.title}</div>
                <div className="attachment-download-link">
                    <a href={this.state.url}>Download slides as PDF</a>
                </div>
                <div>{slides}</div>
            </div>
        )
    }

}


// pdf version
// class Attachments extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             nowPage: 1,
//         };
//     }

//     componentWillMount() {
//         const file_id = this.props.params.file_id
//         const ins = axios.create({
//             baseURL: settings.backend_url,
//             timeout: 1000,
//         })

//         ins.get('files/' + file_id)
//         .then((res) => {
//             console.log(res);
//             this.setState(res.data);
//             let tmp = this;
//             let redirect_url = 'http://127.0.0.1:8080/'
//             PDFJS.getDocument(redirect_url + this.state.url).then(function(pdf) {
//                 tmp.setState({nowPage: 1, lastPage: pdf.numPages})
//             })
//         })
//         .catch((error) => {
//             console.log(error);
//         })
//     }

//     componentDidMount() {
//         const file_id = this.props.params.file_id
//         const ins = axios.create({
//             baseURL: settings.backend_url,
//             timeout: 1000,
//         })
//         ins.get('files/' + file_id)
//         .then((res) => {
//             let tmp = this;
//             let redirect_url = 'http://127.0.0.1:8080/'
//             PDFJS.getDocument(redirect_url + res.data.url).then(function(pdf) {
//                 // tmp.setState({pdf: pdf, nowPage: 1, lastPage: pdf.numPages})
//                 for (let i = 1; i <= tmp.state.lastPage; i += 1) {
//                     const canvas = document.getElementById(i)
//                     console.log(canvas)
//                     pdf.getPage(i).then((page) => {
//                         tmp.renderPage(page, canvas);
//                     })
//                 }
//             })
//         })
//         .catch((error) => {
//             console.log(error);
//         })
//     }

//     renderPage(page, canvas) {
//         const viewport = page.getViewport(1);
//         const canvasContext = canvas.getContext('2d');
//         const renderContext = {
//             canvasContext,
//             viewport
//         };
//         canvas.height = viewport.height;
//         canvas.width = viewport.width;
//         page.render(renderContext);
//     }

//     render() {
//         var slides = [];
//         const file_id = this.props.params.file_id
//         for (var i = 1; i <= this.state.lastPage; i++) {
//             slides.push(
//                 <a href={ file_id + '/pages/' + i}>
//                     <canvas className="slide-thumbnail" id={i}></canvas>
//                 </a>
//             );
//         }
//         return (
//             <div>
//                 <div>{slides}</div>
//             </div>
//         )
//     }

// }

export default Attachments;