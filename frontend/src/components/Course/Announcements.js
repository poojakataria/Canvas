import React, { Component } from 'react';
import '../../App.css';
import { Button, Col, Form } from 'react-bootstrap';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { getAnnouncements, showForm, makeAnnouncements } from '../../actions/announcementAction';
import { connect } from 'react-redux';


class Announcements extends Component {

    constructor(props) {
        super(props);
        this.state = {
            announcement: [],
            show: false,
            topic: '',
            message: '',
            currentPage: 1,
            itemsPerPage: 1
        }
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        let sjsuid = this.props.sjsuId;
        let courseid = this.props.courseid;
        console.log("props in announcement", courseid, sjsuid);
        this.props.getAnnouncements(courseid, sjsuid)
    }

    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }
    addAnnouncement = (e) => {
        this.props.showForm()
    }

    topicHandler = (e) => {
        this.setState({ topic: e.target.value });
    }

    messageHandler = (e) => {
        this.setState({ message: e.target.value });
    }

    makeAnnouncement = (e) => {
        e.preventDefault();
        const data = {
            courseid: this.props.courseid,
            sjsuid: this.props.sjsuId,
            topic: this.state.topic,
            message: this.state.message,
        }
        this.props.makeAnnouncements(data)
    }
    render() {
        const { currentPage, itemsPerPage } = this.state;

        // Logic for displaying current todos
        const indexOfLastTodo = currentPage * itemsPerPage;
        const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
        const currentTodos = this.props.announcement.slice(indexOfFirstTodo, indexOfLastTodo);

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.props.announcement.length / itemsPerPage); i++) {
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
        if (this.props.announcement.length === 0) {
            details = [<tr>
                <th>-</th>
                <th>-</th>
                <th>-</th>
            </tr>]
        }
        else {
            details = currentTodos.map(announcement => {
                return (
                    <tr>
                        <td>{announcement.topic}</td>
                        <td>{announcement.announcement}</td>
                        <td>{announcement.createdat}</td>
                    </tr>
                )
            });
        }

        return (
            <div>
                {redirectVar}
                <div class="container">
                    <h2>Announcements</h2>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Topic</th>
                                <th>Announcement</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {details}
                        </tbody>
                    </table>
                    {this.props.role === 'faculty' ? <Button onClick={this.addAnnouncement}>+ Announcement </Button> : null}
                    {this.props.show ?
                        <Form onSubmit={this.makeAnnouncement}>
                            <br />
                            <Form.Row>
                                <Col sm="4">
                                    <Form.Label>Topic: </Form.Label>
                                </Col>
                                <Col sm="8">
                                    <Form.Control type='text' name='Topic' onChange={this.topicHandler} defaultValue='' placeholder='Type topic here' required />
                                </Col>
                            </Form.Row>
                            <br />
                            <Form.Row>
                                <Col sm="4">
                                    <Form.Label>Announcement: </Form.Label>
                                </Col>
                                <Col sm="8">
                                    <Form.Control type='text' name='Message' onChange={this.messageHandler} defaultValue='' placeholder='Type Message here' required />
                                </Col>
                            </Form.Row>
                            <br />
                            <Form.Row>
                                <Col sm="4"></Col>
                                <Col sm="8">
                                    <Button type="submit">Make Announcement</Button>
                                </Col>
                            </Form.Row>
                        </Form>
                        : null}

                </div>
                <ul id="pagination">
                    {renderPageNumbers}
                </ul>

            </div>
        )
    }

};

const mapStateToProps = (state) => {
    console.log("State from Store", state.announcement.announcement)
    return {
        announcement: state.announcement.announcement,
        show: state.announcement.show
    };
}

const AnnouncementsPage = connect(mapStateToProps, { getAnnouncements, makeAnnouncements, showForm })(Announcements)
export { AnnouncementsPage as Announcements };