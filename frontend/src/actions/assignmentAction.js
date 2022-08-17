import axios from "axios";
import { BACKEND_URL } from "../components/config"

export const ASSIGNMENT = "assignment";
export const SHOW_FORM = "show_form";
export const LOAD_ASSIGNMENT = "load_assignment";
export const VIEW_UPLOAD = "view_upload";
export const VIEW_ASSIGNMENT = "view_Assignment";

export function getAssignment(courseid, sjsuid) {
    var token = localStorage.getItem("token");
    return dispatch => {
        axios.get('http://' + BACKEND_URL + ':8080/getAssignment', {
            headers: { "Authorization": `Bearer ${token}` },
            params: { courseid: courseid, sjsuid: sjsuid }
        })
            .then((response) => {
                console.log("response data from getAssignment", response.data);
                dispatch({
                    type: ASSIGNMENT,
                    assignment: response.data
                })
            });
    }
}

export function newAssignment(data) {
    var token = localStorage.getItem("token");
    return dispatch => {
        axios.post('http://' + BACKEND_URL + ':8080/loadAssignment', data, {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then((response) => {
                console.log("response data from loadAssignment", response.data);
                dispatch(
                    getAssignment(data.courseid, data.sjsuid)
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

export function viewUpload() {
    return {
        type: VIEW_UPLOAD,
        view: false
    }
}
export function loadAssignment(data) {
    var token = localStorage.getItem("token");

    return dispatch => {
        axios.post('http://' + BACKEND_URL + ':8080/UploadAssignment', data, {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then((response) => {
                console.log("response data from loadAssignment", response.data);
                dispatch(
                    {
                        type: LOAD_ASSIGNMENT,
                        view: true
                    }
                )
            });
    }
}

export function viewAssignment(loadAssignmentId, sjsuid) {
    var token = localStorage.getItem("token");

    return dispatch => {
        axios.get('http://' + BACKEND_URL + ':8080/viewAssignment', {
            headers: { "Authorization": `Bearer ${token}` },
            params: { assignmentid: loadAssignmentId, sjsuid: sjsuid }
        })
            .then((response) => {
                console.log("response data from viewAssignment", response.data, response.data.length);
                if (response.data.length > 0) {
                    dispatch(
                        {
                            type: VIEW_ASSIGNMENT,
                            assignmentUrl: 'http://' + BACKEND_URL + ':8080/' + response.data[0].fileUrl,
                            assignmentFileName: response.data[0].filename,
                            assignmentSubmissionId: parseInt(loadAssignmentId)

                        }
                    )
                }

            });
    }
}