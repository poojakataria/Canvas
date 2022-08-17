import React, { Component } from 'react';
import '../../App.css';
import { SearchResults } from './SearchResults';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { searchCourses, emptySearch } from '../../actions/searchCourseAction';
import { connect } from 'react-redux';

class SearchCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: "Spring 2019",
            coursename: "",
            courseid: "",
            filter: "=",
            courses: []
        }
        this.termHandler = this.termHandler.bind(this);
        this.coursenameHandler = this.coursenameHandler.bind(this);
        this.courseidHandler = this.courseidHandler.bind(this);
        this.filterHandler = this.filterHandler.bind(this);
        this.searchHandler = this.searchHandler.bind(this);
    }

    componentDidMount() {
        this.props.emptySearch()
    }

    termHandler = (e) => {
        this.setState({ term: e.target.value });
    }

    coursenameHandler = (e) => {
        this.setState({ coursename: e.target.value });
    }

    courseidHandler = (e) => {
        this.setState({ courseid: e.target.value });
    }

    filterHandler = (e) => {
        this.setState({ filter: e.target.value });
    }

    searchHandler = (e) => {
        e.preventDefault();
        // this.setState({ courses: [] });
        let searchData = {
            term: this.state.term,
            coursename: this.state.coursename,
            courseid: this.state.courseid,
            filter: this.state.filter,
            sjsuid: this.props.sjsuId
        }
        console.log("data in searchHandler of searchCourse", searchData);
        this.props.searchCourses(searchData)
    }

    render() {
        let redirectVar = null
        if (!cookie.load('sjsuid')) {
            redirectVar = <Redirect to="/Login" />
        }
        return (
            <div>
                {redirectVar}
                <div >
                    <h2>Search Course</h2>
                    <br />
                    <Row>
                        <Col sm="12">
                            <Form.Row>
                                <Col sm="3">
                                    <Form.Label>Search by Term: </Form.Label>
                                </Col>
                                <Col sm="4">
                                    <select defaultValue={this.state.term} onChange={this.termHandler}>
                                        <option value="Spring 2019">Spring 2019</option>
                                        <option value="Fall 2019">Fall 2019</option>
                                        <option value="Winter 2019">Winter 2019</option>
                                        <option value="Spring 2020">Spring 2020</option>
                                        <option value="Fall 2020">Fall 2020</option>
                                        <option value="Winter 2020">Winter 2020</option>
                                    </select>
                                </Col>
                            </Form.Row>
                            <br />
                            <Form.Row>
                                <Col sm="3">
                                    <Form.Label> Search by Course name: </Form.Label>
                                </Col>
                                <Col sm="6">
                                    <input type="text" name="coursename" placeholder="Course Name"
                                        onChange={this.coursenameHandler} />
                                </Col>
                            </Form.Row>
                            <br />
                            <Form.Row>
                                <Col sm="3">
                                    <Form.Label> Search by Course ID: </Form.Label>
                                </Col>
                                <Col sm="3">
                                    <select value={this.state.filter} onChange={this.filterHandler}>
                                        <option value="=">Equals To</option>
                                        <option value=">=">Greater Than Equal To</option>
                                        <option value="like">Like</option>
                                    </select>
                                </Col>

                            </Form.Row>
                            <br />
                            <Form.Row>
                                <Col sm="3"></Col>
                                <Col sm="4">
                                    <input type="text" name="courseid" placeholder="Course Number"
                                        onChange={this.courseidHandler} />
                                </Col>
                            </Form.Row>
                            <br />
                            <Form.Row>
                                <Col sm="3"></Col>
                                <Col sm="4">
                                    <Button variant="primary" onClick={this.searchHandler}>Search</Button>
                                </Col>
                            </Form.Row>
                            <br />

                            {(this.props.courses.length === 0) ? null : <SearchResults courses={this.props.courses} sjsuId={this.props.sjsuId} role={this.props.role} />}


                        </Col>
                    </Row>
                </div >
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("State from Store", state.searchCourse.courses)
    return {
        courses: state.searchCourse.courses
    };
}

const SearchCoursePage = connect(mapStateToProps, { searchCourses, emptySearch })(SearchCourse)
export { SearchCoursePage as SearchCourse };
