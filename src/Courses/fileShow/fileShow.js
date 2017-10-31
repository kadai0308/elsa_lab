import React, { Component } from 'react';
import PDFJS from 'pdfjs-dist';
import axios from 'axios';
import './fileShow.css'

class lectureShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jumpPage: '',
        };
        this.nextPage = this.nextPage.bind(this);
        this.prePage = this.prePage.bind(this);
        this.renderSlide = this.renderSlide.bind(this);
        this.handleJumpPage = this.handleJumpPage.bind(this);
        this.jumpTo = this.jumpTo.bind(this);
    }

    componentWillMount() {
        const file_id = this.props.params.file_id
        const ins = axios.create({
            baseURL: 'http://127.0.0.1:8000/',
            timeout: 1000,
        })

        ins.get('files/' + file_id)
        .then((res) => {
            console.log(res);
            this.setState(res.data);
            let tmp = this;
            PDFJS.getDocument(this.state.url).then(function(pdf) {
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

    // renderSlides() {
    //     let canvas_set = '';
    //     let slides_tag = document.getElementById('slides');
    //     for (let i = 0; i < this.state.totalPages; ++i) {
    //         canvas_set += '<canvas id="the-canvas-"' + i + '></canvas>'
    //     }
    //     slides_tag.appendChild(canvas_set);
    //     if (this.state.url) {
    //         let loadingTask = PDFJS.getDocument(this.state.url);
    //         loadingTask.then(function(pdf) {
    //             console.log('PDF loaded');
    //             let totalPage = pdf.numPages;
    //             let scale = .5;
    //             // Fetch the first page
    //             for (let pageNum = 1; pageNum <= totalPage; pageNum++ ) {
    //                 pdf.getPage(pageNum).then(function(page) {
    //                     let viewport = page.getViewport(scale);

    //                     // Prepare canvas using PDF page dimensions
    //                     let canvas = document.getElementById('the-canvas-' + pageNum);
    //                     var context = canvas.getContext('2d');
    //                     canvas.height = viewport.height;
    //                     canvas.width = viewport.width;

    //                     // Render PDF page into canvas context
    //                     let renderContext = {
    //                       canvasContext: context,
    //                       viewport: viewport
    //                     };
    //                     let renderTask = page.render(renderContext);
    //                     renderTask.then(function () {
    //                         console.log('Page rendered');
    //                     });                        
    //                 }, function (reason) {
    //                     // PDF loading error
    //                     console.error(reason);
    //                 });
    //             }
    //         });
    //     }
    // }

    render() {
        return (
            <div className="course-front-file-show-bg">
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
                </div>
            </div>
        )
    }
}

export default lectureShow;