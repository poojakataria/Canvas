import React, { Component } from 'react';
import { BACKEND_URL } from "../config"
import '../../App.css';
import { Button } from 'react-bootstrap';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { viewSubmission, submitGrade } from '../../actions/viewSubmissionAction';
import { connect } from 'react-redux';


class ViewSubmissions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            submissions: [],
            grade: ''
        }

        this.nameHandler = this.nameHandler.bind(this);
    }

    componentDidMount() {
        let assignmentid = this.props.match.params.assignmentid;
        this.props.viewSubmission(assignmentid);
    }

    nameHandler = (e) => {
        let grade = e.target.value;
        this.setState({
            grade: grade
        })
    }

    handleSubmit = (e) => {
        let studentid = e.target.name;
        const data = {
            sjsuid: studentid,
            grade: this.state.grade,
            assignmentid: this.props.match.params.assignmentid
        }
        this.props.submitGrade(data)
    }

    render() {
        let redirectVar = null
        if (!cookie.load('sjsuid')) {
            redirectVar = <Redirect to="/Login" />
        }
        let details = []
        if (this.props.submissions.length === 0) {
            details = [
                <tr>
                    <td>-</td>
                    <td>-</td>
                </tr>

            ]
        }

        else {
            details = this.props.submissions.map(submission => {
                console.log("grades value ", submission.grade !== null)
                console.log(submission.grade)
                let fileurl = 'http://' + BACKEND_URL + ':8080/' + submission.fileUrl
                return (
                    <tr>
                        <td>{submission.name}</td>
                        <td><a href={fileurl} download target="_blank">{submission.filename}</a></td>
                        <td><input type="text" defaultValue={submission.grade === null ? '' : submission.grade} disabled={submission.grade !== null} placeholder="Grade" onChange={this.nameHandler} /></td>
                        <td><Button name={submission.sjsuid} onClick={this.handleSubmit} disabled={submission.grade !== null}>Post Grade</Button></td>
                    </tr>
                )
            })
        }
        return (
            <div>
                {redirectVar}
                <div class="container">
                    <h2>Submissions</h2>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Student Name</th>
                                <th>Assigment</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {details}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    console.log("State from Store", state.viewSubmission.submissions)
    return {
        submissions: state.viewSubmission.submissions
    };
}

const ViewSubmissionsPage = connect(mapStateToProps, { viewSubmission, submitGrade })(ViewSubmissions)
export { ViewSubmissionsPage as ViewSubmissions };
