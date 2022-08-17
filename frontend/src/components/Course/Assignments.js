import React, { Component } from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';
import { Col, Form, Button } from 'react-bootstrap';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { getAssignment, newAssignment, showForm, loadAssignment, viewUpload, viewAssignment } from '../../actions/assignmentAction';
import { connect } from 'react-redux';

class Assignments extends Component {

    constructor(props) {
        super(props);

        this.state = {
            assignment: [],
            show: false,
            description: '',
            dueDate: '',
            maxPoints: '',
            files: [],
            file: '',
            view: true,
            assignmentid: '',
            viewAssignment: false,
            assignmentSubmissionId: 0,
            assignmentUrl: '',
            assignmentFileName: ''
        }
        this.addAssignment = this.addAssignment.bind(this);
        this.descriptionHandler = this.descriptionHandler.bind(this);
        this.dueDateHandler = this.dueDateHandler.bind(this);
        this.maxPointsHandler = this.maxPointsHandler.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.createAssignment = this.createAssignment.bind(this);
        this.uploadAssignment = this.uploadAssignment.bind(this);
        this.viewAssignmentHandler = this.viewAssignmentHandler.bind(this);

    }

    componentDidMount() {
        let sjsuid = this.props.sjsuId;
        let courseid = this.props.courseid;
        this.props.getAssignment(courseid, sjsuid)
    }


    addAssignment = (e) => {
        this.props.showForm()

    }
    descriptionHandler = (e) => {
        this.setState({ description: e.target.value });
    }

    dueDateHandler = (e) => {
        this.setState({ dueDate: e.target.value });
    }

    maxPointsHandler = (e) => {
        this.setState({ maxPoints: e.target.value });
    }

    handleFile = (e) => {
        e.preventDefault();
        this.setState({
            file: e.target.files[0]
        })
        this.props.viewUpload()
    }

    createAssignment = (e) => {

        e.preventDefault();
        const data = {
            courseid: this.props.courseid,
            sjsuid: this.props.sjsuId,
            description: this.state.description,
            duedate: this.state.dueDate,
            maxpoints: this.state.maxPoints
        }
        this.props.newAssignment(data)
    }

    uploadAssignment = (e) => {
        e.preventDefault();
        let date = new Date();
        let loadAssignmentId = e.target.name;
        date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        const data = new FormData()
        data.append('file', this.state.file)
        data.append('filename', this.state.file.name)
        data.append('assignmentid', loadAssignmentId)
        data.append('sjsuid', this.props.sjsuId)
        data.append('courseid', this.props.courseid)
        data.append('submissiondate', date)

        this.props.loadAssignment(data)
    }

    viewAssignmentHandler = (e) => {
        let loadAssignmentId = e.target.name;
        let sjsuid = this.props.sjsuId;
        this.props.viewAssignment(loadAssignmentId, sjsuid)
    }

    render() {
        let redirectVar = null
        console.log(this.props)
        if (!cookie.load('sjsuid')) {
            redirectVar = <Redirect to="/Login" />
        }
        let details = []
        if (this.props.assignment.length === 0) {
            details = [
                <tr>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td></td>
                </tr>]
        }

        else {

            details = this.props.assignment.map(assignment => {
                let submissionPath = '/Faculty/CourseDetail/' + this.props.courseid + '/ViewSubmissions/' + assignment.assignmentid;
                return (
                    <tr>
                        <td>{assignment.description}</td>
                        <td>{assignment.duedate}</td>
                        <td>{assignment.maxpoints}</td>
                        {this.props.role === 'student' ? <td><input type="file" onChange={this.handleFile} /><br /><br /><Button onClick={this.uploadAssignment} name={assignment.assignmentid} disabled={this.props.view} >Upload</Button></td> :
                            <td><Button variant="outline-primary"><Link to={submissionPath}>View Submissions</Link></Button></td>}
                        {this.props.role === 'student' ? <td><Button variant="outline-primary" name={assignment.assignmentid} onClick={this.viewAssignmentHandler} disabled={this.state.viewAssignment} >View Assignment </Button> </td> : null}
                        {this.props.role === 'student' && assignment.assignmentid === this.props.assignmentSubmissionId ? <td> <a href={this.props.assignmentUrl} download target="_blank">{this.props.assignmentFileName}</a></td> : null}
                    </tr>
                )
            });
        }
        return (
            <div>
                {redirectVar}
                <div class="container">
                    <h2>Assignments</h2>
                    <div>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th> Assignment</th>
                                    <th> Due Date</th>
                                    <th> Points</th>
                                    {this.props.role === 'student' ? <th></th> : <th></th>}
                                    {this.props.role === 'student' ? <th></th> : null}
                                    {this.props.role === 'student' ? <th></th> : null}
                                    {this.props.role === 'student' ? <th></th> : null}
                                    {this.props.role === 'student' ? <th></th> : null}
                                </tr>
                            </thead>
                            <tbody>
                                {details}
                            </tbody>
                        </table>
                    </div>

                    {this.props.role === 'faculty' ?
                        <Button onClick={this.addAssignment}>+ Assignment </Button>
                        : null}

                    {this.props.show ?
                        <Form onSubmit={this.createAssignment}>
                            <br />
                            <Form.Row>
                                <Col sm="4">
                                    <Form.Label>Description: </Form.Label>
                                </Col>
                                <Col sm="8">
                                    <Form.Control type='text' name='Description' onChange={this.descriptionHandler} defaultValue='' placeholder='Description' required />
                                </Col>
                            </Form.Row>
                            <br />
                            <Form.Row>
                                <Col sm="4">
                                    <Form.Label>Submission Type: </Form.Label>
                                </Col>
                                <Col sm="4">
                                    <Form.Control type='text' name='File' defaultValue='' disabled placeholder='File, PDF, JPG/JPEG' />
                                </Col>
                            </Form.Row>
                            <br />
                            <Form.Row>
                                <Col sm="4">
                                    <Form.Label>Due Date: </Form.Label>
                                </Col>
                                <Col sm="4">
                                    <Form.Control type='date' name='DueDate' onChange={this.dueDateHandler} defaultValue='' placeholder='Due Date' required />
                                </Col>
                            </Form.Row>
                            <br />
                            <Form.Row>
                                <Col sm="4">
                                    <Form.Label>Max Points: </Form.Label>
                                </Col>
                                <Col sm="4">
                                    <Form.Control type='text' name='points' onChange={this.maxPointsHandler} defaultValue='' placeholder='Max Points' required />
                                </Col>
                            </Form.Row>
                            <br />
                            <Form.Row>
                                <Col sm="4"></Col>
                                <Col sm="4"><Button type="submit">Create Assignment </Button></Col>
                            </Form.Row>
                        </Form>
                        : null}
                </div>
            </div>
        )
    }

};

const mapStateToProps = (state) => {
    console.log("State from Store", state.assignment.assignment)
    return {
        assignment: state.assignment.assignment,
        show: state.assignment.show,
        view: state.assignment.view,
        assignmentUrl: state.assignment.assignmentUrl,
        assignmentFileName: state.assignment.assignmentFileName,
        assignmentSubmissionId: state.assignment.assignmentSubmissionId
    };
}

const AssignmentsPage = connect(mapStateToProps,
    { getAssignment, newAssignment, showForm, viewUpload, loadAssignment, viewAssignment })
    (Assignments)
export { AssignmentsPage as Assignments };


