import React, { Component } from 'react';
import '../../App.css';
import { Nav, Container, Row, Col, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { CourseHome } from './CourseHome';
import { People } from './People';
import { Announcements } from './Announcements';
import { Quiz } from './Quiz';
import { Assignments } from './Assignments';
import { LectureFiles } from './LectureFiles';
import { ViewSubmissions } from './ViewSubmissions';
import { Grades } from './Grades';
import { QuizDetail } from './QuizDetail';

class CourseDetail extends Component {

    render() {
        let courseid = this.props.match.params.courseId;
        let redirectVar = null
        if (!cookie.load('sjsuid')) {
            redirectVar = <Redirect to="/Login" />
        }
        let navRole = this.props.role == "student" ? "/Student" : "/Faculty"
        let baseUrl = navRole + "/CourseDetail/" + courseid

        return (
            <div>
                {redirectVar}

                <Container>
                    <Row>
                        <Col sm="2">
                            <Navbar className="courseDetail">
                                <Nav role="navigation" activeKey="CourseHome" className="flex-column">
                                    <Nav.Link eventKey="CourseHome"><Link to={`${baseUrl}/CourseHome`}>Home</Link></Nav.Link>
                                    <Nav.Link eventKey="People"><Link to={`${baseUrl}/People`}>People</Link></Nav.Link>
                                    <Nav.Link eventKey="Assignments"><Link to={`${baseUrl}/Assignments`}>Assignments</Link></Nav.Link>
                                    {this.props.role === 'student' ? <Nav.Link eventKey="Grades"><Link to={`${baseUrl}/Grades`}>Grades</Link></Nav.Link> : null}
                                    <Nav.Link eventKey="Quiz"><Link to={`${baseUrl}/Quiz`}>Quiz</Link></Nav.Link>
                                    <Nav.Link eventKey="Files"><Link to={`${baseUrl}/LectureFiles`}>Files</Link></Nav.Link>
                                    <Nav.Link eventKey="Announcements"><Link to={`${baseUrl}/Announcements`} >Announcements</Link></Nav.Link>
                                </Nav>
                            </Navbar>
                        </Col>
                        <Col sm="10">
                            <Route path={`${baseUrl}/CourseHome`} render={(props) => <CourseHome {...props} sjsuId={this.props.sjsuId} role={this.props.role} courseid={courseid} />} />
                            <Route path={`${baseUrl}/People`} render={(props) => <People {...props} sjsuId={this.props.sjsuId} role={this.props.role} courseid={courseid} />} />
                            <Route path={`${baseUrl}/Announcements`} render={(props) => <Announcements {...props} sjsuId={this.props.sjsuId} role={this.props.role} courseid={courseid} />} />
                            <Route path={`${baseUrl}/Quiz`} render={(props) => <Quiz {...props} sjsuId={this.props.sjsuId} role={this.props.role} courseid={courseid} />} />
                            <Route path={`${baseUrl}/Assignments`} render={(props) => <Assignments {...props} sjsuId={this.props.sjsuId} role={this.props.role} courseid={courseid} />} />
                            <Route path={`${baseUrl}/LectureFiles`} render={(props) => <LectureFiles {...props} sjsuId={this.props.sjsuId} role={this.props.role} courseid={courseid} />} />
                            <Route path={`${baseUrl}/ViewSubmissions/:assignmentid`} render={(props) => <ViewSubmissions {...props} sjsuId={this.props.sjsuId} role={this.props.role} courseid={courseid} />} />
                            <Route path={`${baseUrl}/Grades`} render={(props) => <Grades {...props} sjsuId={this.props.sjsuId} role={this.props.role} courseid={courseid} />} />
                            <Route path={`${baseUrl}/QuizDetail/:quizid`} render={(props) => <QuizDetail {...props} sjsuId={this.props.sjsuId} role={this.props.role} courseid={courseid} />} />
                            {redirectVar === null ?
                                <Redirect to={`${baseUrl}/CourseHome`} /> : null}


                        </Col>
                    </Row>

                </Container>

            </div>
        )
    }
}

export default CourseDetail;