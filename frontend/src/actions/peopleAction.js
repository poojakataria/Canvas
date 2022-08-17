import axios from "axios";
import { BACKEND_URL } from "../components/config"
export const PEOPLE = "people";
export const CLOSE_MODAL = "close_modal"

export function peopleHome(courseid, role, show) {
    var token = localStorage.getItem("token");
    return dispatch => {
        axios.get('http://' + BACKEND_URL + ':8080/getStudents', {
            headers: { "Authorization": `Bearer ${token}` },
            params: { courseid: courseid, role: role }
        })
            .then((response) => {
                console.log("response data from getStudents", response.data);
                dispatch({
                    type: PEOPLE,
                    students: response.data,
                    show: show
                })
            });
    }
}

export function peopleRemove(data) {
    var token = localStorage.getItem("token");
    return dispatch => {
        axios.post('http://' + BACKEND_URL + ':8080/Drop', data, {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then((response) => {
                if (response.data === 'Dropped') {
                    dispatch(
                        peopleHome(data.courseid, data.role, false)
                    )
                }
            });
    }
}

export function givePermission(data) {
    var token = localStorage.getItem("token");
    return dispatch => {
        axios.post('http://' + BACKEND_URL + ':8080/givePermission', data, {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then((response) => {
                if (response.data === 'Successful enrollment') {
                    dispatch(
                        peopleHome(data.courseid, data.role, true)
                    )
                }
                else {
                    console.log("Student not found")
                }
            });
    }
}

export function closeModal() {
    return {
        type: CLOSE_MODAL,
        show: false
    }
}


