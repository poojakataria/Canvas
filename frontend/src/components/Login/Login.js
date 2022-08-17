import React, { Component } from 'react';
import { FRONTEND_URL } from "../config"
import '../../App.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Form, Button, Container, Row, Col, InputGroup } from 'react-bootstrap';
import { submitLogin } from '../../actions/loginAction'
import { connect } from 'react-redux'


//Component
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loginAs: '',
            authFlag: false,
            show: false
        }
        //Bind function
        this.usernameHandler = this.usernameHandler.bind(this);
        this.passwordHandler = this.passwordHandler.bind(this);
        this.loginAsHandler = this.loginAsHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);

    }

    componentWillMount() {
        this.setState({
            authFlag: false
        })
    }

    usernameHandler = (e) => {
        this.setState({
            username: e.target.value,
        })
    }

    passwordHandler = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    loginAsHandler = (e) => {
        this.setState({
            loginAs: e.target.value
        })
    }

    submitLogin = (e) => {
        // var headers = new Headers();

        e.preventDefault();
        const data = {
            username: this.state.username,
            password: this.state.password,
            loginAs: this.state.loginAs
        }

        this.props.submitLogin(data, (res) => {
            console.log("response from actions", res)
            if (res.data === 'Incorrect') {
                this.setState({
                    show: true,
                    username: '',
                    password: '',
                    loginAs: ''
                })
            }
            else {
                if (res.data.role === 'student')
                    this.props.history.push('/Student');
                else
                    this.props.history.push('/Faculty');
            }

        })
    }


    render() {
        //redirect based on successful login
        let redirectVar = null;
        console.log("outside cookie", cookie.load('sjsuid'), cookie.load('role'))
        if (cookie.load('sjsuid')) {
            redirectVar = cookie.load('role') === 'student' ? <Redirect to="/Student" /> : <Redirect to="/Faculty" />;
        }
        return (
            <Container align='center' className='login'>

                {redirectVar}
                <Form onSubmit={this.submitLogin}>
                    <Row className="justify-content-md-center">
                        <img src={`http://${FRONTEND_URL}:3000/sjsuLogo.png`} width="300" height="50" />
                    </Row>
                    <br />
                    <Row className="justify-content-md-center">
                        <h5>Sign In</h5>
                    </Row>
                    <br />
                    <Row className="justify-content-md-center">
                        <Col md="auto">
                            <Form.Check inline
                                type="radio"
                                label="I am a Student"
                                name="role"
                                value="student"
                                onClick={this.loginAsHandler}
                                checked={this.state.loginAs === 'student'}
                                required
                            />
                            <Form.Check inline
                                type="radio"
                                label="I am a Faculty"
                                name="role"
                                value="faculty"
                                onClick={this.loginAsHandler}
                                checked={this.state.loginAs === 'faculty'}
                            />
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col >
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1"><i className='fas fa-user'></i></InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control onChange={this.usernameHandler} name="userName" id="userName" className="form-control" type="text" placeholder="SJSU ID" value={this.state.username} required />

                            </InputGroup>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1"><i className='fa fa-lock'></i></InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control onChange={this.passwordHandler} name="password" className="form-control" type="password" placeholder="Password" value={this.state.password} required />
                            </InputGroup>
                        </Col>
                    </Row>
                    <br />
                    {this.state.show ?
                        <Row className="justify-content-md-center">
                            <span style={{ color: 'red' }}>
                                Incorrect login details. Please enter correct login information
                            </span>
                        </Row>

                        : null}
                    <br />
                    <Row className="justify-content-md-center">
                        <Button variant="info" type="submit">Sign In</Button>
                    </Row>
                    <br />
                    <Row className="justify-content-md-center">
                        <Link to="/SignUp" variant='success'>New user?Sign up here</Link>
                    </Row>
                </Form >


            </Container>
        )
    }
}

const loginPage = connect(null, { submitLogin })(Login)
export { loginPage as Login };