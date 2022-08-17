import React, { Component } from 'react';
import '../../App.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { createCourse } from '../../actions/createCourseAction';
import { connect } from 'react-redux';

class CreateCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            courseName: '',
            courseDept: '',
            courseDescription: '',
            courseRoom: '',
            courseCapacity: '',
            courseWaitlist: '',
            courseTerm: 'Spring 2019'
        }
        this.handleUpdate = this.handleUpdate.bind(this);

    }

    handleUpdate(e) {

        const data = new FormData(e.target);
        data.append('sjsuid', this.props.sjsuId);
        data.append('role', this.props.role);
        e.preventDefault();

        this.props.createCourse(data, (res) => {
            console.log("response from actions", res)
            this.props.history.push('/Faculty/MainCourse');
        })

    }

    render() {
        let redirectVar = null
        if (!cookie.load('sjsuid')) {
            redirectVar = <Redirect to="/Login" />
        }
        return (
            <div>
                {redirectVar}
                <Container>
                    <Row>
                        <Col sm="12">
                            <Form onSubmit={this.handleUpdate} class="form-horizontal">
                                <Form.Row>
                                    <Col sm="8"><h2>Add New Course</h2></Col>
                                </Form.Row>
                                <br />
                                <Form.Row>
                                    <Col sm="3">
                                        <Form.Label>Course Id: </Form.Label>
                                    </Col>
                                    <Col sm="6">
                                        <Form.Control type="text" name="courseid" Value={this.state.courseId} required />
                                    </Col>
                                </Form.Row>
                                <br />
                                <Form.Row>
                                    <Col sm="3">
                                        <Form.Label>Course Name: </Form.Label>
                                    </Col>
                                    <Col sm="6">
                                        <Form.Control type="text" name="coursename" Value={this.state.courseName} required />
                                    </Col>
                                </Form.Row>
                                <br />
                                <Form.Row>
                                    <Col sm="3">
                                        <Form.Label>Course Department: </Form.Label>
                                    </Col>
                                    <Col sm="6">
                                        <Form.Control type="text" name="coursedept" Value={this.state.courseDept} required />
                                    </Col>
                                </Form.Row>
                                <br />
                                <Form.Row>
                                    <Col sm="3">
                                        <Form.Label>Course Description: </Form.Label>
                                    </Col>
                                    <Col sm="6">
                                        <Form.Control type="text" name="coursedescription" Value={this.state.courseDescription} required />
                                    </Col>
                                </Form.Row>
                                <br />
                                <Form.Row>
                                    <Col sm="3">
                                        <Form.Label>Course Room: </Form.Label>
                                    </Col>
                                    <Col sm="6">
                                        <Form.Control type="text" name="courseroom" Value={this.state.courseRoom} required />
                                    </Col>
                                </Form.Row>
                                <br />
                                <Form.Row>
                                    <Col sm="3">
                                        <Form.Label>Course Maximum Capacity: </Form.Label>
                                    </Col>
                                    <Col sm="6">
                                        <Form.Control type="number" name="coursecapacity" Value={this.state.courseCapacity} required />
                                    </Col>
                                </Form.Row>
                                <br />
                                <Form.Row>
                                    <Col sm="3">
                                        <Form.Label>Course Waitlist Capacity: </Form.Label>
                                    </Col>
                                    <Col sm="6">
                                        <Form.Control type="number" name="waitlistcapacity" Value={this.state.courseWaitlist} required />
                                    </Col>
                                </Form.Row>
                                <br />
                                <Form.Row>
                                    <Col sm="3">
                                        <Form.Label>Course Term: </Form.Label>
                                    </Col>
                                    <Col sm="6">
                                        <Form.Control as="select" name="courseterm" defaultValue={this.state.courseTerm} >
                                            <option value="Spring 2019">Spring 2019</option>
                                            <option value="Fall 2019">Fall 2019</option>
                                            <option value="Winter 2019">Winter 2019</option>
                                            <option value="Spring 2020">Spring 2020</option>
                                            <option value="Fall 2020">Fall 2020</option>
                                            <option value="Winter 2020">Winter 2020</option>
                                        </Form.Control>
                                    </Col>
                                </Form.Row>
                                <br />
                                <Form.Row>
                                    <Col sm="8">
                                        <Button type="submit">+ Create Course</Button>
                                    </Col>
                                </Form.Row>
                            </Form>
                        </Col>
                    </Row >
                </Container >
            </div>
        )
    }
}


const CreateCoursePage = connect(null, { createCourse })(CreateCourse)
export { CreateCoursePage as CreateCourse };



