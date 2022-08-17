import React, { Component } from 'react';
import { FRONTEND_URL } from '../config'
import { UserProfile } from '../UserProfile/UserProfile';
import Home from '../Home/Home';
import '../../App.css';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import { Nav, Container, Row, Col, Navbar, Image } from 'react-bootstrap';
import { MainCourse } from '../Course/MainCourse';
import { SearchCourse } from '../Course/SearchCourse';
import CourseDetail from '../Course/CourseDetail';
import { Dashboard } from '../Course/Dashboard';
import { Inbox } from '../Inbox/Inbox';
import cookie from 'react-cookies';
import { logout } from '../../actions/logoutAction';
import { connect } from 'react-redux';


class Student extends Component {

    handleLogout = (e) => {
        console.log("inside logout", this.props)
        this.props.logout(() => {
            cookie.remove('sjsuid', { path: '/' })
            cookie.remove('role', { path: '/' })
            this.props.history.push('/Login');
        })

    }
    render() {
        console.log("sjsu id inside student", cookie.load('sjsuid'), cookie.load('role'));
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
                            <div className="sjsulogo"><Image src={`http://${FRONTEND_URL}:3000/SJSU.png`} width="110px" height="60px" /></div>
                        </Col>
                        <Col>
                            <div className="header"></div>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={2} md={1}>
                            <Navbar expand="lg" >
                                <Nav role="navigation" defaultActiveKey="Dashboard" className="flex-column">
                                    <Nav.Link eventKey="Profile"><Link to='/Student/UserProfile'><i className="fas fa-user-circle fa-4x navlinkText"></i><span className="navlinkText">Account</span></Link></Nav.Link>
                                    <Nav.Link eventKey="Dashboard"><Link to='/Student/Dashboard'><i className="fa fa-dashboard fa-4x navlinkText"></i><span className="navlinkText">Dashboard</span><span></span></Link></Nav.Link>
                                    <Nav.Link eventKey="Courses"><Link to='/Student/MainCourse'><i className="fa fa-book fa-4x navlinkText"></i><span className="navlinkText">Courses</span></Link></Nav.Link>
                                    <Nav.Link eventKey="Inbox"><Link to='/Student/Inbox'><i className="fas fa-envelope fa-4x navlinkText"></i><span className="navlinkText"><span>Inbox</span></span></Link></Nav.Link>
                                    <Nav.Link eventKey="Library" href="https://library.sjsu.edu/" target="_blank"><i className="fas fa-book-reader fa-4x navlinkText"></i><span className="navlinkText">Library</span></Nav.Link>
                                    <Nav.Link eventKey="Logout" onSelect={this.handleLogout}><i className="fa fa-power-off fa-4x navlinkText"></i><span className="navlinkText">Logout</span></Nav.Link>
                                </Nav>
                            </Navbar>
                        </Col>
                        <Col sm={4} md={11}>
                            <Route path='/Student/UserProfile' render={(props) => <UserProfile {...props} sjsuId={sjsuid} role={role} />} />
                            <Route path='/Student/Home' render={(props) => <Home {...props} sjsuId={sjsuid} role={role} />} />
                            <Route path='/Student/MainCourse' render={(props) => <MainCourse {...props} sjsuId={sjsuid} role={role} />} />
                            <Route path='/Student/Inbox' render={(props) => <Inbox {...props} sjsuId={sjsuid} role={role} />} />
                            <Route path='/Student/Dashboard' render={(props) => <Dashboard {...props} sjsuId={sjsuid} role={role} />} />
                            <Route path="/Student/SearchCourse" render={(props) => <SearchCourse {...props} sjsuId={sjsuid} role={role} />} />
                            <Route path="/Student/CourseDetail/:courseId" render={(props) => <CourseDetail {...props} sjsuId={sjsuid} role={role} />} />
                            {redirectVar === null ?
                                <Redirect to="/Student/Dashboard" /> : null}
                        </Col>
                    </Row>
                </Container>

            </div>
        )
    }
}
const studentPage = connect(null, { logout })(Student)
export { studentPage as Student };