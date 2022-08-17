import axios from "axios";
import { BACKEND_URL } from "../components/config"
export const COURSE_HOME = "course_home";

export function courseHome(courseid) {
    var token = localStorage.getItem("token");
    return dispatch => {
        axios.get('http://' + BACKEND_URL + ':8080/getCourseInfo', {
            headers: { "Authorization": `Bearer ${token}` },
            params: { courseid: courseid }
        })
            .then((response) => {
                console.log("response data from getCourseInfo", response.data);
                dispatch({
                    type: COURSE_HOME,
                    courseInformation: response.data
                })
            });
    }
}

