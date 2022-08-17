import React, { Component } from 'react';
import '../../App.css';
import { Button, Modal } from 'react-bootstrap';
import { enrollInCourse, enrollInWaitlist, getCourseResults } from '../../actions/searchResultsAction'
import { connect } from 'react-redux';

class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            name: '',
            description: '',
            currentPage: 1,
            itemsPerPage: 2
        }

        this.enroll = this.enroll.bind(this);
        this.enrollInWaitlist = this.enrollInWaitlist.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.props.getCourseResults(this.props.courses)
    }

    componentDidUpdate() {
        this.props.getCourseResults(this.props.courses)
    }

    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    enroll = (e) => {
        console.log("enroll button value", this.props.sjsuId)
        console.log("enroll button value", this.props.role)
        const data = {
            sjsuid: this.props.sjsuId,
            role: this.props.role,
            courseid: e.target.name,
            status: 'EN',
            courses: this.props.courseResults
        }
        this.setState({
            currentPage: 1
        })

        this.props.enrollInCourse(data)
    }

    enrollInWaitlist = (e) => {
        console.log("enroll button value", this.props.sjsuId)
        console.log("enroll button value", this.props.role)
        const data = {
            sjsuid: this.props.sjsuId,
            role: this.props.role,
            courseid: e.target.name,
            status: 'WL',
            courses: this.props.courseResults
        }

        this.setState({
            currentPage: 1
        })
        this.props.enrollInWaitlist(data)
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow = e => {
        this.setState({
            show: true,
            name: e.target.name,
            description: e.target.value
        });
    }

    render() {
        const { currentPage, itemsPerPage } = this.state;

        // Logic for displaying current todos

        const indexOfLastTodo = currentPage * itemsPerPage;
        const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
        const currentTodos = this.props.courseResults.slice(indexOfFirstTodo, indexOfLastTodo);

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.props.courseResults.length / itemsPerPage); i++) {
            pageNumbers.push(i);
        }
        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={this.handleClick}
                >
                    {number}
                </li>
            );
        });
        console.log("currentTodos", currentTodos)
        let details = currentTodos.map(course => {
            return (
                <tr>
                    <td>{course.id}</td>
                    <td>{course.name}</td>
                    <td>{course.dept}</td>
                    <td>
                        <Button variant="primary" onClick={this.handleShow} name={course.name} value={course.description}>View</Button>
                    </td>
                    <td>{course.room}</td>
                    <td>{course.capacity}</td>
                    <td>{course.waitlist}</td>
                    <td>{course.term}</td>
                    <td><Button variant="success" name={course.id} disabled={course.canEnroll === false || course.enrolled === true} onClick={this.enroll}>Enroll </Button></td>
                    <td><Button variant="warning" name={course.id} disabled={course.canWaitList === false || course.waitlisted === true} onClick={this.enrollInWaitlist}>Waitlist Enroll </Button></td>
                </tr>
            )
        })
        return (
            <div class="container">
                <h2>Course List</h2>
                <table class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Department</th>
                            <th>Description</th>
                            <th>Classroom</th>
                            <th>Capacity</th>
                            <th>Waitlist</th>
                            <th>Term</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {details}
                    </tbody>
                </table>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.state.description}</Modal.Body>
                </Modal>
                <ul id="pagination">
                    {renderPageNumbers}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("State from Store", state.searchResults.courseResults)
    return {
        courseResults: state.searchResults.courseResults
    };
}

const SearchResultsPage = connect(mapStateToProps, { enrollInCourse, enrollInWaitlist, getCourseResults })(SearchResults)
export { SearchResultsPage as SearchResults };