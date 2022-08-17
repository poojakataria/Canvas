import React, { Component } from 'react';
import { FRONTEND_URL } from '../config'
import { UserProfile } from '../UserProfile/UserProfile';
import Home from '../Home/Home';
import '../../App.css';
import { Redirect } from 'react-router';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { Nav, Container, Row, Col, Navbar, Image } from 'react-bootstrap';
import { MainCourse } from '../Course/MainCourse';
import { CreateCourse } from '../Course/CreateCourse';
import CourseDetail from '../Course/CourseDetail';
import { Dashboard } from '../Course/Dashboard';
import cookie from 'react-cookies';
import { Inbox } from '../Inbox/Inbox';
import { logout } from '../../actions/logoutAction';
import { connect } from 'react-redux';

class Faculty extends Component {

    handleLogout = (e) => {
        console.log("inside logout", this.props)
        this.props.logout(() => {
            cookie.remove('sjsuid', { path: '/' })
            cookie.remove('role', { path: '/' })
            this.props.history.push('/Login');
        })
    }

    render() {
        let sjsuid = cookie.load('sjsuid');
        let role = cookie.load('role');
        let redirectVar = null;
        if (!cookie.load('sjsuid')) {
            redirectVar = <Redirect to="/Login" />
        }
        return (
            <div>
                {redirectVar}
                <Container className="profileContainer" fluid>

                    <Row>
                        <Col sm={2} md={1}>
                            <div className="sjsulogo"><Image src={`http://${FRONTEND_URL}:3000/SJSU.png`}
                                width="110px" height="60px" /></div>
                        </Col>
                        <Col>
                            <div className="header"></div>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={2} md={1}>
                            <Navbar expand="lg" >
                                <Nav role="navigation" defaultActiveKey="/home" className="flex-column">
                                    <Nav.Link eventKey="Profile"><Link to='/Faculty/UserProfile'><i className="fas fa-user-circle fa-4x navlinkText"></i><span className="navlinkText">Account</span></Link></Nav.Link>
                                    <Nav.Link eventKey="Dashboard"><Link to='/Faculty/Dashboard'><i className="fa fa-dashboard fa-4x navlinkText"></i><span className="navlinkText">Dashboard</span><span></span></Link></Nav.Link>
                                    <Nav.Link eventKey="Courses"><Link to='/Faculty/MainCourse'><i className="fa fa-book fa-4x navlinkText"></i><span className="navlinkText">Courses</span></Link></Nav.Link>
                                    <Nav.Link eventKey="Inbox"><Link to='/Faculty/Inbox'><i className="fas fa-envelope fa-4x navlinkText"></i><span className="navlinkText"><span>Inbox</span></span></Link></Nav.Link>
                                    {/* <Nav.Link eventKey="Help" href="https://community.canvaslms.com/community/answers/guides/" target="_blank"><i className="fa fa-question-circle fa-4x navlinkText"></i><span className="navlinkText"><span>Help</span></span></Nav.Link> */}
                                    <Nav.Link eventKey="Library" href="https://library.sjsu.edu/" target="_blank"><i className="fas fa-book-reader fa-4x navlinkText"></i><span className="navlinkText">Library</span></Nav.Link>
                                    <Nav.Link eventKey="Logout" onSelect={this.handleLogout}><i className="fa fa-power-off fa-4x navlinkText"></i><span className="navlinkText">Logout</span></Nav.Link>
                                </Nav>
                            </Navbar>
                        </Col>

                        <Col sm={4} md={11}>
                            <Route path='/Faculty/UserProfile' render={(props) => <UserProfile {...props} sjsuId={sjsuid} role={role} />} />
                            <Route path='/Faculty/Home' render={(props) => <Home {...props} sjsuId={sjsuid} role={role} />} />
                            <Route path='/Faculty/MainCourse' render={(props) => <MainCourse {...props} sjsuId={sjsuid} role={role} />} />
                            <Route path='/Faculty/Inbox' render={(props) => <Inbox {...props} sjsuId={sjsuid} role={role} />} />
                            <Route path='/Faculty/Dashboard' render={(props) => <Dashboard {...props} sjsuId={sjsuid} role={role} />} />
                            <Route path="/Faculty/CreateCourse" render={(props) => <CreateCourse {...props} sjsuId={sjsuid} role={role} />} />
                            <Route path="/Faculty/CourseDetail/:courseId" render={(props) => <CourseDetail {...props} sjsuId={sjsuid} role={role} />} />
                            {redirectVar === null ?
                                <Redirect to="/Faculty/Dashboard" /> : null}
                        </Col>
                    </Row>

                </Container>
            </div>
        )
    }

}
const facultyPage = connect(null, { logout })(Faculty)
export { facultyPage as Faculty };