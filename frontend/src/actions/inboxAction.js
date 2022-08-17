import axios from 'axios'
import { BACKEND_URL } from "../components/config"

export const SEND_MESSAGE = 'send_message'
export const GET_MESSAGE = 'get_message'
export const SHOW_MODAL = "show_modal"
export const CLOSE_MODAL = "close_modal"

export function sendMessages(data) {
    var token = localStorage.getItem("token");
    return dispatch => {
        axios.post('http://' + BACKEND_URL + ':8080/sendMessage', data, {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then((response) => {
                console.log("response data from makeAnnouncement", response.data);
                dispatch({
                    type: SEND_MESSAGE,
                    show: false
                })
            });
    }
}

export function getMessages(sjsuid) {
    var token = localStorage.getItem("token");
    return dispatch => {
        axios.get('http://' + BACKEND_URL + ':8080/getMessage', {
            headers: { "Authorization": `Bearer ${token}` },
            params: { sjsuid: sjsuid }
        })
            .then((response) => {
                console.log("response data from getMessage", response.data);
                dispatch({
                    type: GET_MESSAGE,
                    messages: response.data
                })
            });
    }
}

export function showModal() {
    return ({
        type: SHOW_MODAL,
        show: true
    })
}

export function closeModal() {
    return ({
        type: CLOSE_MODAL,
        show: false
    })
}