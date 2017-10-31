import React from 'react';
// import digital from './img/hardware.jpeg'
import './Main.css'

let contactMain = (props) => (
    <div className="contact-main">
        <div className="flex-box">
            <div className="location-info">
                <div className="address">
                    <div className='contact-title'>
                        <div>Address</div>
                    </div>
                    <div className="content">
                        Department of Computer Science, <br />
                        National Tsing Hua University, <br />
                        No.101, Sec .2, Kuang-Fu Road, <br />
                        Hsinchu, 30013, <br />
                        Taiwan
                    </div>
                </div>
                <div className="address">
                    <div className='contact-title'>
                        <div>Office</div>
                    </div>
                    <div className="content">
                        Phone: +886-3-5731308 <br/>
                        Email: cylee@cs.nthu.edu.tw <br/>
                        Address: Delta Building 606 <br/>
                    </div>
                </div>
            </div>
            <div className="send-message">
                <div className='contact-title'>
                    <div>Message</div>
                </div>
                <form action="#">
                    <div className="input-group">
                        <input className="input" type="text" placeholder="Name"/>
                        <input className="input" type="text" placeholder="Email"/>
                        <textarea className="textarea" name="" id="" placeholder="Message"></textarea>
                        <div className="submit-btn">submit</div>
                    </div>
                </form>
            </div>
        </div>
        <div className="google-map"></div>
    </div>
)

export default contactMain;