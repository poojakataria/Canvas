import React, { Component } from 'react';
import '../../App.css';
import { Button, Modal, Col, Form } from 'react-bootstrap';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Input } from 'reactstrap';
import { sendMessages, getMessages, showModal, closeModal } from '../../actions/inboxAction'
import { connect } from 'react-redux';

class Inbox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            to: '',
            subject: '',
            message: '',
            currentPage: 1,
            itemsPerPage: 2
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        let sjsuid = this.props.sjsuId;
        console.log("props in getMessage", sjsuid);

        this.props.getMessages(sjsuid)

    }
    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    handleShow = e => {
        this.props.showModal()
    }

    handleClose = () => {
        this.props.closeModal()
    }

    toHandler = (e) => {
        this.setState({ to: e.target.value });
    }

    subjectHandler = (e) => {
        this.setState({ subject: e.target.value });
    }

    messageHandler = (e) => {
        this.setState({ message: e.target.value });
    }

    sendMessage = e => {
        e.preventDefault()
        const data = {
            to: this.state.to,
            from: this.props.sjsuId,
            subject: this.state.subject,
            message: this.state.message,
        }

        console.log("data in sendMessage", data)
        this.props.sendMessages(data)

    }

    render() {
        const { currentPage, itemsPerPage } = this.state;

        // Logic for displaying current todos
        const indexOfLastTodo = currentPage * itemsPerPage;
        const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
        const currentTodos = this.props.messages.slice(indexOfFirstTodo, indexOfLastTodo);

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.props.messages.length / itemsPerPage); i++) {
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
        if (this.props.messages.length === 0) {
            details = [<tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
            </tr>]
        }
        else {
            details = currentTodos.map(message => {
                return (
                    <tr>
                        <td>{message.from}</td>
                        <td>{message.subject}</td>
                        <td>{message.message}</td>
                        <td>{message.createdat}</td>
                    </tr>
                )
            });
        }
        return (

            < div class="container" >
                {redirectVar}
                <h2>Inbox</h2>
                <br />
                <Button onClick={this.handleShow}>+ New Message </Button>
                <br />
                <br />

                <table class="table">
                    <thead>
                        <tr>
                            <th>From</th>
                            <th>Subject</th>
                            <th>Message</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {details}
                    </tbody>
                </table>


                <Modal show={this.props.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Message</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.sendMessage}>
                            <Form.Row>
                                <Col sm="2">
                                    <Form.Label>To: </Form.Label>
                                </Col>
                                <Col sm="10">
                                    <Form.Control type='text' name='To' onChange={this.toHandler} defaultValue='' required />
                                </Col>
                            </Form.Row>
                            <br />
                            <Form.Row>
                                <Col sm="2">
                                    <Form.Label>Subject: </Form.Label>
                                </Col>
                                <Col sm="10">
                                    <Form.Control type='text' name='Subject' onChange={this.subjectHandler} defaultValue='' required />
                                </Col>
                            </Form.Row>
                            <br />
                            <Form.Row>
                                <Col sm="2">
                                    <Form.Label>Message: </Form.Label>
                                </Col>
                                <Col sm="10">
                                    <Input type="textarea" name='Message' onChange={this.messageHandler} defaultValue='' required />
                                </Col>
                            </Form.Row>
                            <br />
                            <Form.Row>
                                <Col sm="4"></Col>
                                <Col sm="8">
                                    <Button type="submit">Send</Button>
                                </Col>
                            </Form.Row>
                        </Form>
                    </Modal.Body>
                </Modal>

                <ul id="pagination">
                    {renderPageNumbers}
                </ul>
            </div >
        )
    }
};

const mapStateToProps = (state) => {
    console.log("State from Store", state.inbox.messages)
    return {
        messages: state.inbox.messages,
        show: state.inbox.show
    };
}

const InboxPage = connect(mapStateToProps, { getMessages, sendMessages, showModal, closeModal })(Inbox)
export { InboxPage as Inbox };