import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Form, Button, Container, Row, Col, InputGroup } from 'react-bootstrap';
import { signUp } from '../../actions/signUpAction';
import { connect } from 'react-redux';

//Component
class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            name: "",
            email: "",
            password: "",
            sjsuId: "",
            authFlag: false
        }
        //Bind function
        this.nameHandler = this.nameHandler.bind(this);
        this.emailHandler = this.emailHandler.bind(this);
        this.passwordHandler = this.passwordHandler.bind(this);
        this.userTypeHandler = this.userTypeHandler.bind(this);
        this.sjsuIdHandler = this.sjsuIdHandler.bind(this);
        this.submitNewUser = this.submitNewUser.bind(this);

    }

    nameHandler = (e) => {
        this.setState({
            name: e.target.value,
        })
    }
    emailHandler = (e) => {
        this.setState({
            email: e.target.value,
        })
    }
    passwordHandler = (e) => {
        this.setState({
            password: e.target.value,
        })
    }
    userTypeHandler = (e) => {
        this.setState({
            user: e.target.value,
        })
    }
    sjsuIdHandler = (e) => {
        this.setState({
            sjsuId: e.target.value,
        })
    }

    submitNewUser = (e) => {
        // var headers = new Headers();

        e.preventDefault();
        const data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            user: this.state.user,
            sjsuId: this.state.sjsuId
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        this.props.signUp(data, (res) => {
            console.log("response from actions", res)
            if (res.data === 'User exist') {
                alert("User already exists, Please try again with your password");
            }
            this.props.history.push('/Login');
        })

    }

    render() {
        return (

            <Container align='center' className='signUp'>
                <Form onSubmit={this.submitNewUser}>
                    <Form.Group as={Col}>
                        <Form.Label align='center'><h1>Sign Up</h1></Form.Label>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Please provide the following information:</Form.Label>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label></Form.Label>
                        <Form.Check inline
                            type="radio"
                            label="Student"
                            name="role"
                            value="student"
                            id="student"
                            onClick={this.userTypeHandler}
                            required
                        />
                        <Form.Check inline
                            type="radio"
                            label="Faculty"
                            name="role"
                            value="faculty"
                            id="faculty"
                            onClick={this.userTypeHandler}
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>SJSU ID</Form.Label>
                        <Form.Control onChange={this.sjsuIdHandler} name="id" class="form-control" type="number" placeholder="SJSU ID" required />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Name</Form.Label>
                        <Form.Control onChange={this.nameHandler} name="name" class="form-control" type="text" placeholder="Name" required />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control onChange={this.emailHandler} name="email" class="form-control" type="email" placeholder="Email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={this.passwordHandler} name="password" class="form-control" type="password" placeholder="Password" required />
                    </Form.Group>
                    <br />
                    <Row className="justify-content-md-center">
                        <Button variant="info" type="submit">Sign Up</Button>
                    </Row>
                </Form>
            </Container>

        )
    }
}

const SignUpPage = connect(null, { signUp })(SignUp)
export { SignUpPage as SignUp };
