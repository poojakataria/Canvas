import axios from "axios";
import { BACKEND_URL } from "../components/config"
export const VIEW_SUBMISSION = "view_submission";
export const SUBMIT_GRADE = "submit_grade";

export function viewSubmission(assignmentid) {
    var token = localStorage.getItem("token");
    return dispatch => {
        axios.get('http://' + BACKEND_URL + ':8080/getSubmissions', {
            headers: { "Authorization": `Bearer ${token}` },
            params: { assignmentid: assignmentid }
        })
            .then((response) => {
                console.log("response data from getSubmissions", response.data);
                dispatch({
                    type: VIEW_SUBMISSION,
                    submissions: response.data
                })
            });
    }
}

export function submitGrade(data) {
    var token = localStorage.getItem("token");
    return dispatch => {
        axios.post('http://' + BACKEND_URL + ':8080/postGrade', data, {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then((response) => {
                console.log("response data from postGrade", response.data);
            });
    }
}
