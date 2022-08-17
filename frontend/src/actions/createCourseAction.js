import axios from "axios";
import { BACKEND_URL } from "../components/config"
export const CREATE_COURSE = "create_course";

export function createCourse(data, callback) {
    var token = localStorage.getItem("token");
    return dispatch => {
        axios.post('http://' + BACKEND_URL + ':8080/AddCourse', data, {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then(response => {
                console.log("in action", response);
                callback(response);
            });
    }
}

