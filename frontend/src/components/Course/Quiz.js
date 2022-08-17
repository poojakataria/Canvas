import React, { Component } from 'react';
import '../../App.css';
import { Form, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { getQuizInfo, loadQuiz, showQuiz } from '../../actions/quizAction';
import { connect } from 'react-redux';

class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quiz: [],
            quizname: '',
            question: '',
            option1: '',
            option2: '',
            option3: '',
            option4: '',
            answer: '1',
            quizdate: '',
            currentPage: 1,
            itemsPerPage: 1
        }

        this.updateQuiz = this.updateQuiz.bind(this);
        this.questionHandler = this.questionHandler.bind(this);
        this.option1Handler = this.option1Handler.bind(this);
        this.option2Handler = this.option2Handler.bind(this);
        this.option3Handler = this.option3Handler.bind(this);
        this.option4Handler = this.option4Handler.bind(this);
        this.answerHandler = this.answerHandler.bind(this);
        this.quiznameHandler = this.quiznameHandler.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        let courseid = this.props.courseid;
        let sjsuid = this.props.sjsuId;
        this.props.getQuizInfo(courseid, sjsuid)
    }

    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    addQuiz = (e) => {
        this.props.showQuiz()
    }

    quiznameHandler = (e) => {
        this.setState({
            quizname: e.target.value
        })
    }
    questionHandler = (e) => {
        console.log("question", e.target.value);
        this.setState({
            question: e.target.value
        })
    }

    option1Handler = (e) => {
        console.log("option1", e.target.value);
        this.setState({
            option1: e.target.value
        })
    }

    option2Handler = (e) => {
        console.log("option2", e.target.value);
        this.setState({
            option2: e.target.value
        })
    }

    option3Handler = (e) => {
        console.log("option3", e.target.value);
        this.setState({
            option3: e.target.value
        })
    }

    option4Handler = (e) => {
        console.log("option4", e.target.value);
        this.setState({
            option4: e.target.value
        })
    }

    answerHandler = (e) => {
        console.log("answer", e.target.value);
        this.setState({
            answer: e.target.value
        })
    }

    updateQuiz = (e) => {
        let date = new Date();

        date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        const quizData = {
            quizname: this.state.quizname,
            question: this.state.question,
            option1: this.state.option1,
            option2: this.state.option2,
            option3: this.state.option3,
            option4: this.state.option4,
            answer: this.state.answer === "" ? "1" : this.state.answer,
            courseid: this.props.courseid,
            quizdate: date
        }
        console.log("quiz data", quizData)
        console.log("before setting", this.state.quiz)
        this.state.quiz.push(quizData);

        console.log("after setting", this.state.quiz)
        this.setState({
            quiz: this.state.quiz,
            question: '',
            option1: '',
            option2: '',
            option3: '',
            option4: '',
            answer: ''
        })

        console.log("udpate quiz", this.state.quiz);

    }


    handleSubmit = (e) => {

        this.props.loadQuiz(this.state.quiz, this.props.courseid, this.props.sjsuId, (res) => {
            this.setState({
                quiz: [],
                quizname: '',
                question: '',
                option1: '',
                option2: '',
                option3: '',
                option4: '',
                answer: '1',
            })
        })

    }

    render() {
        const { currentPage, itemsPerPage } = this.state;

        // Logic for displaying current todos
        const indexOfLastTodo = currentPage * itemsPerPage;
        const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
        const currentTodos = this.props.quizInfo.slice(indexOfFirstTodo, indexOfLastTodo);

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.props.quizInfo.length / itemsPerPage); i++) {
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
        if (this.props.quizInfo.length === 0) {
            details = [
                <tr>
                    <td>-</td>
                    <td>-</td>
                </tr>
            ]
        }
        else {

            details = currentTodos.map(info => {
                let quizpath = '/Student/CourseDetail/' + this.props.courseid + '/QuizDetail/' + info.quizid;
                return (
                    <tr>
                        <td>{info.quizname}</td>
                        <td>{info.quizdate}</td>
                        {this.props.role === 'student' && info.sjsuid === 0 ? <td><Button variant="outline-primary"><Link to={quizpath}>Take Quiz</Link></Button></td> : <td></td>}
                    </tr>
                )
            });
        }

        return (
            <div>
                {redirectVar}
                <div class="container">
                    <h2>Quiz</h2>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Quiz Name</th>
                                <th>Created On</th>
                                {this.props.role === 'student' ? <th></th> : null}

                            </tr>
                        </thead>
                        <tbody>
                            {details}
                        </tbody>
                    </table>
                    {this.props.role === 'faculty' ? <Button onClick={this.addQuiz}>+ Quiz </Button> : null}
                    {this.props.show ? <Form>
                        <br />
                        <Form.Row >
                            <Col sm={2}> <Form.Label>Quiz Name</Form.Label></Col>
                            <Col sm={10}><Form.Control type="text" placeholder="Quiz Name" onChange={this.quiznameHandler} value={this.state.quizname} /></Col>
                        </Form.Row>
                        <br />
                        <Form.Row >
                            <Col sm={2}> <Form.Label>Question</Form.Label></Col>
                            <Col sm={10}><Form.Control type="text" placeholder="Question" onChange={this.questionHandler} value={this.state.question} /></Col>
                        </Form.Row>
                        <br />
                        <Form.Row >
                            <Col sm={2}> <Form.Label>Option 1</Form.Label></Col>

                            <Col sm={10}><Form.Control type="text" placeholder="First option" onChange={this.option1Handler} value={this.state.option1} /></Col>
                        </Form.Row>
                        <br />
                        <Form.Row >
                            <Col sm={2}> <Form.Label>Option 2</Form.Label></Col>

                            <Col sm={10}><Form.Control type="text" placeholder="Second option" onChange={this.option2Handler} value={this.state.option2} /></Col>
                        </Form.Row>
                        <br />
                        <Form.Row >
                            <Col sm={2}> <Form.Label>Option 3</Form.Label></Col>
                            <Col sm={10}><Form.Control type="text" placeholder="Third option" onChange={this.option3Handler} value={this.state.option3} /></Col>
                        </Form.Row>
                        <br />
                        <Form.Row >
                            <Col sm={2}> <Form.Label>Option 4</Form.Label></Col>
                            <Col sm={10}><Form.Control type="text" placeholder="Fourth option" onChange={this.option4Handler} value={this.state.option4} /></Col>
                        </Form.Row>
                        <br />
                        <Form.Row >
                            <Col sm={2}> <Form.Label>Correct Answer</Form.Label></Col>
                            <Col sm={10}>
                                <Form.Control as="select" onChange={this.answerHandler} value={this.state.answer}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                </Form.Control>
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Col sm={5}><Button onClick={this.updateQuiz}>Next Question</Button></Col>

                            <Col sm={5}><Button onClick={this.handleSubmit}>Submit Quiz</Button> </Col>
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
    console.log("State from Store", state.quiz.quizInfo)
    return {
        quizInfo: state.quiz.quizInfo,
        show: state.quiz.show
    };
}

const QuizPage = connect(mapStateToProps, { getQuizInfo, loadQuiz, showQuiz })(Quiz)
export { QuizPage as Quiz };


