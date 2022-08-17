import axios from "axios";
import { BACKEND_URL } from "../components/config"
export const LECTURE_FILES = "lecture_files";

export function getFiles(courseid, sjsuid) {
    var token = localStorage.getItem("token");
    return dispatch => {
        axios.get('http://' + BACKEND_URL + ':8080/getLectureFiles', {
            headers: { "Authorization": `Bearer ${token}` },
            params: { courseid: courseid, sjsuid: sjsuid }
        })
            .then((response) => {
                console.log("response data from getlecturefiles", response.data);
                dispatch({
                    type: LECTURE_FILES,
                    files: response.data
                })
            });
    }
}

export function loadFiles(data, sjsuid, courseid) {
    var token = localStorage.getItem("token");
    return dispatch => {
        axios.post('http://' + BACKEND_URL + ':8080/UploadFile', data, {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then(response => {
                console.log("loadfiles data", response.data)
                console.log("course and sjsuid", data.courseid, data.sjsuid)
                dispatch(
                    getFiles(courseid, sjsuid)
                )
            });
    }
}