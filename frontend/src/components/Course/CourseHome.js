import React, { Component } from 'react';
import '../../App.css';
import { Col, Form } from 'react-bootstrap';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { courseHome } from '../../actions/courseHomeAction';
import { connect } from 'react-redux';


class CourseHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseInformation: []
        }
    }

    componentDidMount() {
        let courseid = this.props.courseid;

        console.log("props in home", courseid);
        this.props.courseHome(courseid)
    }


    render() {
        let redirectVar = null
        if (!cookie.load('sjsuid')) {
            redirectVar = <Redirect to="/Login" />
        }
        if (this.props.courseInformation.length > 0) {
            return (
                <div>
                    {redirectVar}
                    <div class="container">
                        <h2>{this.props.courseInformation[0].term}</h2>
                        <Form>
                            <br />
                            <Form.Row>
                                <Col sm="4"><Form.Label>Department: </Form.Label></Col>
                                <Col sm="8">{this.props.courseInformation[0].dept === "MSSE" ? "Software Engineering" : this.state.courseInformation[0].dept}</Col>
                            </Form.Row>
                            <br />
                            <Form.Row>
                                <Col sm="4"><Form.Label>Course Id: </Form.Label></Col>
                                <Col sm="8">{this.props.courseInformation[0].id}</Col>
                            </Form.Row>
                            <br />
                            <Form.Row>
                                <Col sm="4"><Form.Label>Course Name: </Form.Label></Col>
                                <Col sm="8">{this.props.courseInformation[0].name}</Col>
                            </Form.Row>
                            <br />
                            <Form.Row>
                                <Col sm="4"><Form.Label>Course Description: </Form.Label></Col>
                                <Col sm="8">{this.props.courseInformation[0].description}</Col>
                            </Form.Row>
                            <br />
                            <Form.Row>
                                <Col sm="4"><Form.Label>Instructor Name: </Form.Label></Col>
                                <Col sm="8">{this.props.courseInformation[0].facultyname}</Col>
                            </Form.Row>
                            <br />
                            <Form.Row>
                                <Col sm="4"><Form.Label>Instructor Email: </Form.Label></Col>
                                <Col sm="8">{this.props.courseInformation[0].email}</Col>
                            </Form.Row>
                            <br />
                            <Form.Row>
                                <Col sm="4"><Form.Label>Classroom: </Form.Label></Col>
                                <Col sm="8">{this.props.courseInformation[0].room}</Col>
                            </Form.Row>
                            <br />
                            <Form.Row>
                                <Col sm="4"><Form.Label>Maximum Credits: </Form.Label></Col>
                                <Col sm="8">3</Col>
                            </Form.Row>
                            <br />
                        </Form>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div>
                    {redirectVar}
                    <div>
                    </div>
                </div>
            )
        }
    }
};

const mapStateToProps = (state) => {
    console.log("State from Store", state.courseHome.courseInformation)
    return {
        courseInformation: state.courseHome.courseInformation
    };
}

const CourseHomePage = connect(mapStateToProps, { courseHome })(CourseHome)
export { CourseHomePage as CourseHome };


