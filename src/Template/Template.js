import React, { Component } from 'react';
import Front from './Front/Front';
import Management from './Management/Management';
import './Template.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css'; 

class Template extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render () {
        let header;
        const path = this.props.location.pathname;
        if (path.includes('management')) {
            header = <Management />;
        } else {
            header = <Front />;
        }

        return (
            <div>
                {header}
                <div className="main">
                    {this.props.children}
                </div>
                <div className="footer">
                    <div className="content">
                        <div className="copyright">© 2017 Elsa Lab Limited</div>
                        <div className="footer-item footer-item-shadow ">Members</div>
                        <div className="footer-item footer-item-shadow ">Members</div>
                        <div className="footer-item footer-item-shadow ">Members</div>
                        <div className="footer-item">Members</div>
                    </div>
                </div>
            </div>
        )
    }

}

// const Template = (props) => (
//   <div>
//     <div className="header">
//       <IndexLink to='/' className='brand'>Elsa Lab</IndexLink>
//       <Link to='/members' className="item url">Members</Link>
//       <Link to='/courses' className="item url">Courses</Link>
//       <Link to='/publications' className="item url">Publications</Link>
//       <Link to='/contact' className="item url">Contact</Link>
//       <Link to='login' className="item url">Login</Link>
//     </div>
//     <div className="main">
//       {props.children}
//     </div>
//     <div className="footer">
//       <div className="content">
//         <div className="copyright">© 2017 Elsa Lab Limited</div>
//         <div className="footer-item footer-item-shadow ">Members</div>
//         <div className="footer-item footer-item-shadow ">Members</div>
//         <div className="footer-item footer-item-shadow ">Members</div>
//         <div className="footer-item">Members</div>
//       </div>
//     </div>
//   </div>
// );

Template.propTypes = {
  params: React.PropTypes.object,
};

export default Template;