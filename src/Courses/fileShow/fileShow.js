import React, { Component } from 'react';
import PDFJS from 'pdfjs-dist';
import axios from 'axios';
import './fileShow.css'
import settings from '../../settings.js'
import Comment from './Comment/Comment.js'

class fileShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jumpPage: '',
            nowPage: 1
        };
        this.nextPage = this.nextPage.bind(this);
        this.prePage = this.prePage.bind(this);
        this.renderSlide = this.renderSlide.bind(this);
        this.handleJumpPage = this.handleJumpPage.bind(this);
        this.jumpTo = this.jumpTo.bind(this);
        this.renderPDF = this.renderPDF.bind(this);
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
            let tmp = this;
            let redirect_url = 'http://127.0.0.1:8080/'
            PDFJS.getDocument(redirect_url + this.state.url).then(function(pdf) {
                tmp.setState({pdf: pdf, nowPage: 1, lastPage: pdf.numPages})
            })
        })
        .catch((error) => {
            console.log(error);
        })
    }

    renderSlide() {
        let scale = 1;
        let canvas = document.getElementById('slide');
        let num = this.state.nowPage;

        if (this.state.pdf && canvas) {
            let ctx = canvas.getContext('2d');
            this.state.pdf.getPage(num).then(function(page) {
                let viewport = page.getViewport(scale);
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                // Render PDF page into canvas context
                let renderContext = {
                  canvasContext: ctx,
                  viewport: viewport
                };
                let renderTask = page.render(renderContext);
            })
        }
    }

    nextPage() {
        if(this.state.nowPage && this.state.nowPage < this.state.lastPage) {
            let nextPage = this.state.nowPage + 1;
            this.setState({nowPage: nextPage});
        }
    }

    prePage() {
        if(this.state.nowPage && this.state.nowPage > 1 ) {
            let prePage = this.state.nowPage - 1;
            this.setState({nowPage: prePage});
        }
    }

    handleJumpPage(event) {
        this.setState({jumpPage: event.target.value});
    }

    jumpTo() {
        const jumpPage = parseInt(this.state.jumpPage)
        this.setState({nowPage: jumpPage});
    }

    componentDidMount() {
        // if (this.state.url) {
        //     let loadingTask = PDFJS.getDocument(this.state.url);
        //     loadingTask.then(function(pdf) {
        //         console.log('PDF loaded');
        //         let totalPage = pdf.numPages;
        //         let scale = .5;
        //         // Fetch the first page
        //         for (let pageNum = 1; pageNum <= totalPage; pageNum++ ) {
        //             pdf.getPage(pageNum).then(function(page) {
        //                 let viewport = page.getViewport(scale);

        //                 // Prepare canvas using PDF page dimensions
        //                 let canvas = document.getElementById('the-canvas-' + pageNum);
        //                 var context = canvas.getContext('2d');
        //                 canvas.height = viewport.height;
        //                 canvas.width = viewport.width;

        //                 // Render PDF page into canvas context
        //                 let renderContext = {
        //                   canvasContext: context,
        //                   viewport: viewport
        //                 };
        //                 let renderTask = page.render(renderContext);
        //                 renderTask.then(function () {
        //                     console.log('Page rendered');
        //                 });                        
        //             }, function (reason) {
        //                 // PDF loading error
        //                 console.error(reason);
        //             });
        //         }
        //     });
        // }
        this.renderPDF ()   
    }

    renderPDF () {
        // for (let i = 1; i <= 5; i += 1) {
        //     const canvas = document.getElementById(i)
            
        //     this.state.pdf.getPage(i).then((page) => {
        //         this.renderPage(page, canvas);
        //     })
        // }
        const file_id = this.props.params.file_id
        const ins = axios.create({
            baseURL: settings.backend_url,
            timeout: 1000,
        })
        ins.get('files/' + file_id)
        .then((res) => {
            let tmp = this;
            let redirect_url = 'http://127.0.0.1:8080/'
            PDFJS.getDocument(redirect_url + res.data.url).then(function(pdf) {
                // tmp.setState({pdf: pdf, nowPage: 1, lastPage: pdf.numPages})
                for (let i = 1; i <= 5; i += 1) {
                    const canvas = document.getElementById(i)
                    console.log(canvas)
                    pdf.getPage(i).then((page) => {
                        tmp.renderPage(page, canvas);
                    })
                }
            })
        })
        .catch((error) => {
            console.log(error);
        })
    }

    renderPage(page, canvas) {
        const viewport = page.getViewport(1);
        const canvasContext = canvas.getContext('2d');
        const renderContext = {
            canvasContext,
            viewport
        };
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        page.render(renderContext);
    }

    render() {
        var slides = [];
        for (var i = 1; i <= this.state.lastPage; i++) {
            slides.push(<canvas id={i}></canvas>);
        }
        return (
            <div className="course-front-file-show-bg">
                <div id='pdf-viewer'>{slides}</div>
                <div className="course-front-file-show-main">
                    <div className="course-front-file-show-title">{this.state.title}</div>
                    <div className="course-front-file-show-btn-group">
                        <button onClick={this.prePage}>pre-page</button>
                        <button onClick={this.jumpTo}>jump to page</button>
                        <input onChange={this.handleJumpPage} value={this.jumpPage} type="text"/>
                        <button onClick={this.nextPage}>next-page</button>
                    </div>
                    <div className="course-front-file-show-main-slide">
                        <canvas id='slide'></canvas>
                    </div>
                    {this.renderSlide(1)}
                    <Comment fileId={this.props.params.file_id} nowPage={this.state.nowPage} />
                </div>
            </div>
        )
    }
}

export default fileShow;