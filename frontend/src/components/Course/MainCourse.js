import React, { Component } from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { mainCourses, dropCourses } from '../../actions/mainCourseAction';
import { connect } from 'react-redux';


class MainCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: []
        }
        this.dropCourse = this.dropCourse.bind(this);
    }

    componentDidMount() {
        console.log("did mount");
        let sjsuid = this.props.sjsuId;
        let role = this.props.role;
        console.log("props in Main Course", sjsuid, role);
        this.props.mainCourses(sjsuid, role)
    }

    dropCourse = (e) => {
        let courseid = e.target.name;
        let status = null;
        console.log("courseid in drop", courseid)
        var index = this.props.courses.map(function (course) {
            return course.id;
        }).indexOf(courseid);
        console.log("this.props.courses", this.props.courses)
        if (index === -1) {
            console.log("Course Not Found");
        } else {
            status = this.props.courses[index].status;
        }

        const data = {
            courseid: courseid,
            sjsuid: this.props.sjsuId,
            role: this.props.role,
            status: status
        }
        this.props.dropCourses(data)
    }

    render() {
        console.log("maincourse data from store", this.props.courses)
        let redirectVar = null
        if (!cookie.load('sjsuid')) {
            cookie.remove('sjsuid', { path: '/' })
            cookie.remove('role', { path: '/' })
            this.props.history.push('/Login');
        }
        if (this.props.courses.length === 0) {
            return (
                <div>

                    <div class="container">
                        <h2>Existing Courses</h2>
                        <table class="table" striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>Course ID</th>
                                    <th>Course Name</th>
                                    <th>Department</th>
                                    <th>Course Term</th>
                                    <th>Capacity</th>
                                    <th>Waitlist</th>
                                    {this.props.role === 'student' ? <th>Current Status</th> : null}
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                </tr>
                            </tbody>
                        </table>
                        {this.props.role === 'faculty' ?
                            <Link to="/Faculty/CreateCourse" className="btn btn-primary">Create New Course</Link> :
                            <Link to="/Student/SearchCourse" className="btn btn-primary">All Courses</Link>}
                    </div>
                </div>
            )
        }
        else {
            let navRole = this.props.role == "student" ? "/Student" : "/Faculty"
            let details = this.props.courses.map(course => {
                console.log("status of :", course.status === 'EN' ? 'Enrolled' : 'Waitlist')
                console.log(course.status)

                let coursePath = navRole + '/CourseDetail/' + course.id;
                return (
                    <tr>
                        <td><Link to={coursePath}>{course.id}</Link></td>
                        <td>{course.name}</td>
                        <td>{course.dept}</td>
                        <td>{course.term}</td>
                        <td>{course.capacity}</td>
                        <td>{course.waitlist}</td>
                        {this.props.role === 'student' ? <td>{course.status === 'EN' ? 'Enrolled' : 'Waitlist'}</td> : null}
                        {this.props.role === 'student' ? <td><Button name={course.id} onClick={this.dropCourse} variant="warning">Drop </Button></td> : null}
                    </tr>
                )
            })
            return (
                <div>
                    {redirectVar}
                    <div class="container">
                        <h2>Existing Courses</h2>
                        <table class="table" striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>Course ID</th>
                                    <th>Course Name</th>
                                    <th>Department</th>
                                    <th>Course Term</th>
                                    <th>Capacity</th>
                                    <th>Waitlist</th>
                                    {this.props.role === 'student' ? <th>Current Status</th> : null}
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {details}
                            </tbody>
                        </table>
                        {this.props.role === 'faculty' ?
                            <Link to="/Faculty/CreateCourse" className="btn btn-primary">Create New Course</Link> :
                            <Link to="/Student/SearchCourse" className="btn btn-primary">All Courses</Link>}
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    console.log("State from Store", state.mainCourse.courses)
    return {
        courses: state.mainCourse.courses
    };
}

const mainCoursePage = connect(mapStateToProps, { mainCourses, dropCourses })(MainCourse)
export { mainCoursePage as MainCourse };
