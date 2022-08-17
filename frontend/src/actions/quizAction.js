import axios from "axios";
import { BACKEND_URL } from "../components/config"
export const QUIZ = "quiz";
export const QUIZ_INFO = "quiz_info";
export const SHOW_QUIZ = "show_quiz";

export function getQuizInfo(courseid, sjsuid) {
    var token = localStorage.getItem("token");
    return dispatch => {
        axios.get('http://' + BACKEND_URL + ':8080/getQuiz',
            {
                headers: { "Authorization": `Bearer ${token}` },
                params: { sjsuid: sjsuid, courseid: courseid }
            })
            .then((response) => {
                console.log("response data from getQuiz", response.data);
                dispatch({
                    type: QUIZ,
                    quizInfo: response.data
                })
            });
    }
}

export function loadQuiz(insertQuiz, courseid, sjsuid, callback) {
    var token = localStorage.getItem("token");
    return dispatch => {
        axios.post('http://' + BACKEND_URL + ':8080/SubmitQuiz', insertQuiz, {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then(response => {
                console.log("response data in loadQuiz", response.data, courseid, sjsuid)
                dispatch(getQuizInfo(courseid, sjsuid))
                callback(response)
            });
    }
}

export function showQuiz() {
    return {
        type: SHOW_QUIZ,
        show: true
    }
}