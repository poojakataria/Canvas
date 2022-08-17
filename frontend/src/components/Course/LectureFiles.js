import React, { Component } from 'react';
import { BACKEND_URL } from "../config"
import '../../App.css';
import { Button } from 'react-bootstrap';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { getFiles, loadFiles } from '../../actions/lectureFilesAction';
import { connect } from 'react-redux';


class LectureFiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            file: '',
            currentPage: 1,
            itemsPerPage: 2
        }

        this.handleFile = this.handleFile.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        let sjsuid = this.props.sjsuId;
        let courseid = this.props.courseid;
        console.log("props in lectureFiles", courseid, sjsuid);
        this.props.getFiles(courseid, sjsuid)
    }

    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    handleFile = (e) => {
        e.preventDefault();
        this.setState({
            file: e.target.files[0]
        })
    }

    uploadFile = (e) => {
        e.preventDefault();
        const data = new FormData()
        data.append('lecturefile', this.state.file)
        data.append('filename', this.state.file.name)
        data.append('sjsuid', this.props.sjsuId)
        data.append('courseid', this.props.courseid)
        this.props.loadFiles(data, this.props.sjsuId, this.props.courseid)
    }


    render() {
        const { currentPage, itemsPerPage } = this.state;

        // Logic for displaying current todos
        const indexOfLastTodo = currentPage * itemsPerPage;
        const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
        const currentTodos = this.props.files.slice(indexOfFirstTodo, indexOfLastTodo);

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.props.files.length / itemsPerPage); i++) {
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
        }
        let details = []
        if (this.props.files.length === 0) {
            details = [
                <tr>
                    <td>-</td>
                    <td>-</td>
                    {this.props.role === 'student' ? <td>-</td> : null}
                </tr>
            ]

        }
        else {

            details = currentTodos.map(file => {
                let fileurl = 'http://' + BACKEND_URL + ':8080/' + file.filepath
                return (
                    <tr>
                        <td><a href={fileurl} download target="_blank">{file.filename}</a></td>
                        <td>{file.createdat}</td>
                        {this.props.role === 'student' ? <td>{file.createdby}</td> : null}
                    </tr>
                )
            });
        }

        return (
            <div>
                {redirectVar}
                <div class="container">
                    <h2>Files</h2>

                    <table class="table">
                        <thead>
                            <th>File</th>
                            <th>Created On</th>
                            {this.props.role === 'student' ? <th>Created By</th> : null}
                        </thead>
                        <tbody>
                            {details}
                        </tbody>
                    </table>
                    {this.props.role === 'faculty' ? <input type="file" onChange={this.handleFile} /> : null}
                    {this.props.role === 'faculty' ? <Button onClick={this.uploadFile}>Upload File </Button> : null}
                </div>
                <ul id="pagination">
                    {renderPageNumbers}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("State from Store", state.lectureFiles.files)
    return {
        files: state.lectureFiles.files
    };
}

const LectureFilesPage = connect(mapStateToProps, { getFiles, loadFiles })(LectureFiles)
export { LectureFilesPage as LectureFiles };
