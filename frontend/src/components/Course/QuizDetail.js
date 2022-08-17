import React, { Component } from 'react';
import '../../App.css';
import { Form, Button, Row, Col } from 'react-bootstrap';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { getQuizDetail, submitQuiz } from '../../actions/quizDetailAction';
import { connect } from 'react-redux';

class QuizDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            quizInfo: [],
            counter: 0,
            answer: 0,
            quizanswers: []
        }

        this.optionHandler = this.optionHandler.bind(this)
        this.updateQuiz = this.updateQuiz.bind(this)
    }
    componentDidMount() {
        let quizid = this.props.match.params.quizid;
        this.props.getQuizDetail(quizid)
    }

    optionHandler = (e) => {
        this.setState(
            {
                answer: parseInt(e.target.value)
            }
        )
    }

    updateQuiz = (e) => {
        const quizanswer = {
            quizid: this.props.match.params.quizid,
            sjsuid: this.props.sjsuId,
            question: this.props.quizInfo[this.state.counter].question,
            answer: this.state.answer,
            courseid: this.props.courseid
        }

        this.state.quizanswers.push(quizanswer);

        this.setState({
            quizanswers: this.state.quizanswers,
            answer: 0,
            counter: this.state.counter + 1
        })

        console.log("udpate answers", this.state.quizanswers, this.state.counter);

    }

    handleSubmit = (e) => {
        this.props.submitQuiz(this.state.quizanswers, (res) => {
            console.log("response from actions", res)
            this.props.history.push('/Student/CourseDetail/' + this.props.courseid + '/Quiz');
        });
    }
    render() {
        let redirectVar = null
        if (!cookie.load('sjsuid')) {
            redirectVar = <Redirect to="/Login" />
        }
        if (this.props.quizInfo.length > 0) {
            return (
                <div>
                    {redirectVar}
                    <div>
                        <h3>{this.props.quizInfo[0].quizname}</h3>
                        <br></br>
                        {this.state.counter < this.props.quizInfo.length ?
                            <Form>
                                <Form.Group as={Row} >
                                    <Form.Label column sm={2}>Question</Form.Label>
                                    <Form.Label column sm={10}>{this.props.quizInfo[this.state.counter].question}</Form.Label>
                                </Form.Group>
                                <fieldset>
                                    <Form.Group as={Row}>
                                        <Col sm={2}>
                                            <Form.Label as="legend">
                                                Options
                                    </Form.Label>
                                        </Col>

                                        <Col sm={10}>
                                            <Form.Check
                                                type="radio"
                                                label={this.props.quizInfo[this.state.counter].option1}
                                                name="QuizOptions"
                                                onChange={this.optionHandler}
                                                value='1'
                                            />
                                            <Form.Check
                                                type="radio"
                                                label={this.props.quizInfo[this.state.counter].option2}
                                                name="QuizOptions"
                                                onChange={this.optionHandler}
                                                value='2'
                                            />
                                            <Form.Check
                                                type="radio"
                                                label={this.props.quizInfo[this.state.counter].option3}
                                                name="QuizOptions"
                                                onChange={this.optionHandler}
                                                value='3'
                                            />
                                            <Form.Check
                                                type="radio"
                                                label={this.props.quizInfo[this.state.counter].option4}
                                                name="QuizOptions"
                                                onChange={this.optionHandler}
                                                value='4'
                                            />
                                        </Col>
                                    </Form.Group>
                                </fieldset>
                                <Form.Group as={Row}>
                                    <Col sm={{ span: 10, offset: 2 }}><Button onClick={this.updateQuiz}>Next Question</Button></Col>
                                </Form.Group>
                            </Form>
                            : null}
                        {this.state.counter === this.props.quizInfo.length ? <Button onClick={this.handleSubmit}>Submit Quiz</Button> : null}
                    </div>
                </div>
            )
        }
        else {
            return (
                <div>
                    {redirectVar}
                    <div>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    console.log("State from Store", state.quizDetail.quizInfo)
    return {
        quizInfo: state.quizDetail.quizInfo
    };
}

const QuizDetailPage = connect(mapStateToProps, { getQuizDetail, submitQuiz })(QuizDetail)
export { QuizDetailPage as QuizDetail };
