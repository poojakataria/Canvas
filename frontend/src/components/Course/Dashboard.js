import React, { Component } from 'react';
import '../../App.css';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { enrolledCourses, dropCourses, sortEnd } from '../../actions/dashboardAction';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';

const SortableItem = SortableElement(({ value }) =>
    <Col md={4}>
        <Card text="white" style={{ width: '20rem' }}>
            <Card.Header><strong>{value.term}</strong> </Card.Header>
            <Card.Body>
                <Card.Title>{value.id}:{value.name}</Card.Title>
                <Card.Text>{value.description}</Card.Text>
            </Card.Body>
        </Card>
        <br />
    </Col>
);

const SortableList = SortableContainer(({ items }) => {
    return (
        <Row>
            {items.map((value, index) => (
                <SortableItem key={`item-${index}`} index={index} value={value} />
            ))}
            <br />
        </Row>
    );
});

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.dropCourse = this.dropCourse.bind(this);
        this.state = {
            courseArray: []
        }
    }

    componentDidMount() {
        console.log("did mount");
        let sjsuid = this.props.sjsuId;
        let role = this.props.role;
        console.log("props in Dashboard", sjsuid, role);
        this.props.enrolledCourses(sjsuid, role)
    }

    onSortEnd = ({ oldIndex, newIndex }) => {

        console.log("old Index", oldIndex, newIndex)
        this.props.sortEnd(oldIndex, newIndex, this.props.courses, this.props.sjsuId)
    };

    dropCourse = (e) => {
        let courseid = e.target.name;
        let status = null;
        //console.log("data in courses", this.props.courses[0])
        var index = this.props.courses.map(function (course) {
            return course.courseid;
        }).indexOf(courseid);
        //console.log("index is ", index)
        if (index === -1) {
            console.log("Course Not Found");
        } else {
            status = this.props.courses[index].status;
            console.log("status is ", status)
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
        let redirectVar = null
        console.log("dashboard data from store", this.props.courses)
        console.log("dashboard data from courseArray", this.state.courseArray)
        if (!cookie.load('sjsuid')) {
            console.log("props before logging out", this.props)
            redirectVar = <Redirect to="/Login" />
        }
        if (this.props.courses.length === 0) {
            return (
                <Container className="cardContainer">
                    <Col md={4}>
                        <Card bg="light" style={{ width: '20rem' }}>
                            <Card.Header>Information unavailable</Card.Header>
                            <Card.Body>
                                <Card.Title><strong>No Course Added yet</strong></Card.Title>
                                <Card.Text>Add atleast one course from Courses section </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Container>
            )
        }
        else {
            return (

                <div>
                    {redirectVar}
                    <Container className="cardContainer">
                        <SortableList items={this.props.courses} onSortEnd={this.onSortEnd} axis='xy' />
                    </Container>
                </div>

            )
        }
    }
}

const mapStateToProps = (state) => {
    console.log("State from Store", state.dashboard.courses)
    return {
        courses: state.dashboard.courses
    };
}

const DashboardPage = connect(mapStateToProps, { enrolledCourses, dropCourses, sortEnd })(Dashboard)
export { DashboardPage as Dashboard };