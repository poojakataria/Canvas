import axios from "axios";
import { BACKEND_URL } from "../components/config"
export const QUIZ_DETAIL = "quiz_detail";

export function getQuizDetail(quizid) {
    var token = localStorage.getItem("token");

    return dispatch => {
        axios.get('http://' + BACKEND_URL + ':8080/getQuizDetail', {
            headers: { "Authorization": `Bearer ${token}` },
            params: { quizid: quizid }
        })
            .then((response) => {
                console.log("response data from getQuizDetail", response.data);
                dispatch({
                    type: QUIZ_DETAIL,
                    quizInfo: response.data
                })
            });
    }
}

export function submitQuiz(quizanswers, callback) {
    var token = localStorage.getItem("token");

    return dispatch => {
        axios.post('http://' + BACKEND_URL + ':8080/SubmitQuizAnswers', quizanswers, {
            headers: { "Authorization": `Bearer ${token}` }
        }).
            then(response => {
                callback(response);
            });
    }
}