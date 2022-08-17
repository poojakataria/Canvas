import axios from "axios";
import { BACKEND_URL } from "../components/config"
export const MAIN_COURSES = "main_courses";

export function mainCourses(sjsuid, role) {
    var token = localStorage.getItem("token");
    return dispatch => {
        console.log(sjsuid, role)
        axios.get('http://' + BACKEND_URL + ':8080/getCourses', {
            headers: { "Authorization": `Bearer ${token}` },
            params: { sjsuid: sjsuid, role: role }
        })
            .then((response) => {
                console.log("response data from getCourses", response.data);
                dispatch({
                    type: MAIN_COURSES,
                    courses: response.data
                })
            });
    }
}

export function dropCourses(data) {
    var token = localStorage.getItem("token");
    return dispatch => {
        console.log(data)
        axios.post('http://' + BACKEND_URL + ':8080/Drop', data, {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then((response) => {
                if (response.data === 'Dropped') {
                    dispatch(
                        mainCourses(data.sjsuid, data.role)
                    )
                }
            });
    }
}

