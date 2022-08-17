import axios from "axios";
import { BACKEND_URL } from "../components/config"
import arrayMove from 'array-move';
export const ENROLLED_COURSES = "enrolled_courses";
export const SORT_END = "sort_end";

export function enrolledCourses(sjsuid, role) {
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
                    type: ENROLLED_COURSES,
                    courses: response.data
                })
            });
    }
}

export function dropCourses(data) {
    return dispatch => {
        console.log(data)
        axios.post('http://' + BACKEND_URL + ':8080/Drop', data)
            .then((response) => {
                if (response.data === 'Dropped') {
                    dispatch(
                        enrolledCourses(data.sjsuid, data.role)
                    )
                }
            });
    }
}

export function sortEnd(oldIndex, newIndex, courseArray, sjsuid) {
    var token = localStorage.getItem("token");
    let movedCourses = arrayMove(courseArray, oldIndex, newIndex)
    const data = {
        courses: movedCourses,
        sjsuid: sjsuid
    }
    console.log("onsortend", movedCourses)
    axios.post('http://' + BACKEND_URL + ':8080/updateOrder', data, {
        headers: { "Authorization": `Bearer ${token}` }
    })
        .then((response) => {
            console.log("response data from sortEnd", response.data);
        });
    return dispatch => {
        dispatch({
            type: SORT_END,
            courses: movedCourses
        });
    }
}

