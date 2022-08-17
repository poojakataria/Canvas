import axios from "axios";
import { BACKEND_URL } from "../components/config"
export const GRADES = "grades";

export function getGrades(courseid, sjsuid) {
    var token = localStorage.getItem("token");
    return dispatch => {
        axios.get('http://' + BACKEND_URL + ':8080/getGrades', {
            headers: { "Authorization": `Bearer ${token}` },
            params: { courseid: courseid, sjsuid: sjsuid }
        })
            .then((response) => {
                console.log("response data from getGrades", response.data);
                dispatch({
                    type: GRADES,
                    grades: response.data
                })
            });
    }
}