import axios from "axios";
import { BACKEND_URL } from "../components/config"
export const ANNOUNCEMENT = "announcement";
export const SHOW_FORM = "show_form";


export function getAnnouncements(courseid, sjsuid) {
    var token = localStorage.getItem("token");

    return dispatch => {
        axios.get('http://' + BACKEND_URL + ':8080/getAnnouncement', {
            headers: { "Authorization": `Bearer ${token}` },
            params: { courseid: courseid, sjsuid: sjsuid }
        })
            .then((response) => {
                console.log("response data from getannouncement", response.data);
                dispatch({
                    type: ANNOUNCEMENT,
                    announcement: response.data,
                    show: false
                })
            });
    }
}
export function makeAnnouncements(data) {
    var token = localStorage.getItem("token");

    return dispatch => {
        axios.post('http://' + BACKEND_URL + ':8080/makeAnnouncement', data, {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then((response) => {
                console.log("response data from makeAnnouncement", response.data);
                dispatch(
                    getAnnouncements(data.courseid, data.sjsuid)
                )
            });
    }
}

export function showForm() {
    return {
        type: SHOW_FORM,
        show: true
    }
}