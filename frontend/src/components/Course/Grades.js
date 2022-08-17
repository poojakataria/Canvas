import React, { Component } from 'react';
import '../../App.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { getGrades } from '../../actions/gradesAction';
import { connect } from 'react-redux';

class Grades extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grades: []
        }
    }

    componentDidMount() {
        let sjsuid = this.props.sjsuId;
        let courseid = this.props.courseid;
        this.props.getGrades(courseid, sjsuid)
    }

    render() {

        let redirectVar = null
        if (!cookie.load('sjsuid')) {
            redirectVar = <Redirect to="/Login" />
        }
        let details = []
        if (this.props.grades.length === 0) {
            details = [
                <tr>
                    <td>-</td>
                    <td>-</td>
                </tr>

            ]
        }
        else {
            details = this.props.grades.map(grade => {
                return (
                    <tr>
                        <td>{grade.description}</td>
                        {grade.grade === null ? <td>Not yet graded</td> : <td>{grade.grade}/{grade.maxpoints}</td>}
                    </tr>
                )
            })
        }
        return (
            <div>
                {redirectVar}
                <div class="container">
                    <h2>Grades</h2>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Assignment Name</th>
                                <th>Grade</th>
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
    console.log("State from Store", state.grades.grades)
    return {
        grades: state.grades.grades
    };
}

const gradesPage = connect(mapStateToProps, { getGrades })(Grades)
export { gradesPage as Grades };