import React, { Component } from 'react';
import '../../App.css';
import { Button, Modal } from 'react-bootstrap';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { peopleHome, peopleRemove, givePermission, closeModal } from '../../actions/peopleAction';
import { connect } from 'react-redux';

class People extends Component {
    constructor(props) {
        super(props);

        this.state = {
            permissionNum: '',
            currentPage: 1,
            itemsPerPage: 2
        }

        this.removeStudent = this.removeStudent.bind(this);
        this.enrollStudent = this.enrollStudent.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleClick = this.handleClick.bind(this);


    }

    componentDidMount() {
        //let sjsuid = this.props.sjsuId;
        let role = this.props.role;
        let courseid = this.props.courseid;
        this.props.peopleHome(courseid, role, false)
    }

    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    removeStudent = (e) => {
        let studentid = e.target.name;

        let status = null;

        var index = this.props.students.map(function (student) {
            return student.sjsuid.toString();
        }).indexOf(studentid);

        if (index === -1) {
            console.log("Course Not Found");
        } else {
            status = this.props.students[index].status;
        }

        const data = {
            courseid: this.props.courseid,
            sjsuid: studentid,
            role: 'student',
            status: status
        }
        this.props.peopleRemove(data)
    }

    enrollStudent = (e) => {
        let permissionNum = Math.floor(Math.random() * 100000 + 1)
        let studentid = e.target.name;

        const data = {
            courseid: this.props.courseid,
            sjsuid: studentid,
            role: 'student',
            status: 'WL'
        }

        this.setState({ permissionNum: permissionNum })
        this.props.givePermission(data)

    }
    handleClose() {
        this.props.closeModal()
    }

    render() {
        const { currentPage, itemsPerPage } = this.state;

        // Logic for displaying current todos
        const indexOfLastTodo = currentPage * itemsPerPage;
        const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
        const currentTodos = this.props.students.slice(indexOfFirstTodo, indexOfLastTodo);

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.props.students.length / itemsPerPage); i++) {
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



        let redirectVar = null
        if (!cookie.load('sjsuid')) {
            redirectVar = <Redirect to="/Login" />
            //return redirectVar = <Redirect to="/Login" />
        }
        if (this.props.students.length === 0) {
            return (
                <div>
                    <h2>All Students</h2>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Student Name</th>
                                <th>Course Name</th>
                                <th>Role</th>
                                {this.props.role === 'faculty' ? <td>Status</td> : null}
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <th>-</th>
                            <th>-</th>
                            <th>-</th>
                            {this.props.role === 'faculty' ? <th>-</th> : null}
                            <th></th>
                        </tbody>
                    </table>
                </div>
            )
        }
        else {
            let details = currentTodos.map(student => {
                return (
                    <tr>
                        <td>{student.studentname}</td>
                        <td>{student.coursename}</td>
                        <td>{student.role}</td>
                        {this.props.role === 'faculty' ? <td>{student.status === 'EN' ? 'Enrolled' : 'Waitlist'}</td> : null}
                        {this.props.role === 'faculty' ? <td><Button variant="warning" name={student.sjsuid} onClick={this.removeStudent}>Remove </Button></td> : <td></td>}
                        {this.props.role === 'faculty' ?
                            student.status === 'WL' ?
                                <td><Button variant="success" name={student.sjsuid} onClick={this.enrollStudent}>Grant Permission</Button></td>
                                : <td></td>
                            : null
                        }
                    </tr>
                )
            })
            return (
                <div>
                    {redirectVar}
                    <div class="container">
                        <div>
                            <h2>All Students</h2>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Student Name</th>
                                        <th>Course Name</th>
                                        <th>Role</th>
                                        {this.props.role === 'faculty' ? <th>Status</th> : null}
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {details}
                                </tbody>

                            </table>
                            <Modal show={this.props.show} onHide={this.handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Permission Number</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>{this.state.permissionNum}</Modal.Body>
                            </Modal>
                        </div>
                        <ul id="pagination">
                            {renderPageNumbers}
                        </ul>

                    </div>
                </div>
            )
        }
    }
};
const mapStateToProps = (state) => {
    console.log("State from Store", state.people.students)
    return {
        students: state.people.students,
        show: state.people.show
    };
}

const PeoplePage = connect(mapStateToProps, { peopleHome, peopleRemove, givePermission, closeModal })(People)
export { PeoplePage as People };


