import React, { Component } from 'react';
import { BACKEND_URL } from '../config'
import '../../App.css';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import { Container, Row, Col, Image, Form, Button } from 'react-bootstrap';
import { fetchProfile, updateProfile, enableEditing, uploadImage } from '../../actions/userProfileAction';
import { connect } from 'react-redux'

class UserProfile extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            image: '',
            imagePreview: '',
            name: '',
            email: '',
            phone: '',
            aboutMe: '',
            city: '',
            country: '',
            company: '',
            school: '',
            hometown: '',
            languages: '',
            gender: '',
            isVisible: false,
            file: null,
            imageUrl: 'uploads/unknown.jpg'

        }
        //Bind function 
        this.updateHandler = this.updateHandler.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }


    componentDidMount() {
        console.log("did mount");
        let sjsuid = this.props.sjsuId;
        console.log("props in userProfile", sjsuid);
        this.props.fetchProfile(sjsuid)
    }

    updateHandler = (e) => {
        e.preventDefault();
        console.log("inside update handler")
        this.props.enableEditing();
    }


    handleFile = (e) => {
        e.preventDefault();
        this.setState({
            file: e.target.files[0]
        })
    }

    handleUpload = (e) => {
        e.preventDefault();
        const data = new FormData()
        data.append('image', this.state.file)
        data.append('imageName', this.state.file.name)
        data.append('sjsuid', this.props.sjsuId)
        this.props.uploadImage(data)
    }

    handleUpdate(e) {
        console.log("event target", e.target);
        const data = new FormData(e.target);
        console.log("form data", data);
        data.append('sjsuid', this.props.sjsuId)
        e.preventDefault();
        this.props.updateProfile(data, this.props.sjsuId);
    }

    render() {
        let redirectVar = null;
        if (!cookie.load('sjsuid')) {
            console.log("inside props of userprofile", this.props)
            redirectVar = <Redirect to="/Login" />


        }
        return (
            <div>
                {redirectVar}
                <Container>

                    <Row>
                        <Col sm="8">
                            <Form onSubmit={this.handleUpdate} class="form-horizontal">
                                <Form.Row>
                                    <Col sm="8"><h2>My Profile</h2></Col>

                                </Form.Row>
                                <Form.Row>
                                    <Col sm="8">
                                        <Button variant="primary" onClick={this.updateHandler} >+Edit</Button>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col sm="2">
                                        <Form.Label>Name: </Form.Label>
                                    </Col>
                                    <Col sm="4">
                                        <Form.Control type="text" name="name" id="name" disabled={this.props.disabled} defaultValue={this.props.name} required />
                                    </Col>
                                    <Col sm="1">
                                        <Form.Label>Email: </Form.Label>
                                    </Col>
                                    <Col sm="5">
                                        <Form.Control type="email" name="email" id="email" disabled={this.props.disabled} defaultValue={this.props.email} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required />
                                    </Col>
                                </Form.Row>
                                <br />
                                <Form.Row>
                                    <Col sm="2">
                                        <Form.Label>Gender: </Form.Label>
                                    </Col>
                                    <Col sm="6">
                                        <Form.Control type="text" name="gender" id="gender" disabled={this.props.disabled} defaultValue={this.props.gender} />
                                    </Col>
                                </Form.Row>
                                <br />
                                <Form.Row>
                                    <Col sm="2">
                                        <Form.Label>Phone:</Form.Label>
                                    </Col>
                                    <Col sm="4">
                                        <Form.Control type="number" name="phone" id="phone" disabled={this.props.disabled} defaultValue={this.props.phone} />
                                    </Col>
                                </Form.Row>
                                <br />
                                <Form.Row>
                                    <Col sm="2">
                                        <Form.Label>Languages: </Form.Label>
                                    </Col>
                                    <Col sm="4">
                                        <Form.Control type="text" name="languages" id="languages" disabled={this.props.disabled} defaultValue={this.props.languages} />
                                    </Col>
                                </Form.Row>
                                <br />
                                <Form.Row>
                                    <Col sm="2">
                                        <Form.Label>Bio: </Form.Label>
                                    </Col>
                                    <Col sm="10">
                                        <Form.Control type="textarea" name="aboutme" id="aboutme" disabled={this.props.disabled} defaultValue={this.props.aboutMe} />
                                    </Col>
                                </Form.Row>
                                <br />
                                <Form.Row>
                                    <Col sm="2">
                                        <Form.Label>City: </Form.Label>
                                    </Col>
                                    <Col sm="4">
                                        <Form.Control type="text" name="city" id="city" disabled={this.props.disabled} defaultValue={this.props.city} />
                                    </Col>
                                    <Col sm="2">
                                        <Form.Label>Country: </Form.Label>
                                    </Col>
                                    <Col sm="4">
                                        <Form.Control type="text" name="country" id="country" disabled={this.props.disabled} defaultValue={this.props.country} />
                                    </Col>
                                </Form.Row>
                                <br />

                                <Form.Row>
                                    <Col sm="2">
                                        <Form.Label>School: </Form.Label>
                                    </Col>
                                    <Col sm="4">
                                        <Form.Control type="text" name="school" id="school" disabled={this.props.disabled} defaultValue={this.props.school} />
                                    </Col>
                                    <Col sm="2">
                                        <Form.Label>Company: </Form.Label>
                                    </Col>
                                    <Col sm="4">
                                        <Form.Control type="text" name="company" id="company" disabled={this.props.disabled} defaultValue={this.props.company} />
                                    </Col>
                                </Form.Row>
                                <br />
                                <Form.Row>
                                    <Col sm="2">
                                        <Form.Label>Hometown: </Form.Label>
                                    </Col>
                                    <Col sm="4">
                                        <Form.Control type="text" name="hometown" id="hometown" disabled={this.props.disabled} defaultValue={this.props.hometown} />
                                    </Col>
                                    <Col sm="4">
                                        {this.props.isVisible ?
                                            <Button type="submit">Save</Button> : null}
                                    </Col>
                                </Form.Row>
                            </Form>
                        </Col>
                        <Col sm="1">
                            <Image src={"http://" + BACKEND_URL + ":8080/" + this.props.imageUrl} className="img-rounded img-responsive"
                                alt="not available" height="150" width="150" roundedCircle />
                            <input type="file" onChange={this.handleFile} />
                            <br />
                            <button type="upload" onClick={this.handleUpload}>Upload </button>
                            <br />
                        </Col>
                    </Row>
                </Container >
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    console.log("state", state.userProfile)
    return {
        name: state.userProfile.name,
        email: state.userProfile.email,
        phone: state.userProfile.phone,
        aboutMe: state.userProfile.aboutMe,
        city: state.userProfile.city,
        country: state.userProfile.country,
        company: state.userProfile.company,
        school: state.userProfile.school,
        hometown: state.userProfile.hometown,
        languages: state.userProfile.languages,
        gender: state.userProfile.gender,
        imageUrl: state.userProfile.imageUrl,
        disabled: state.userProfile.disabled,
        isVisible: state.userProfile.isVisible
    };
}


const UserProfilePage = connect(mapStateToProps, { fetchProfile, updateProfile, enableEditing, uploadImage })(UserProfile);
export { UserProfilePage as UserProfile };
