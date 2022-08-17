import { GET_MESSAGE, SEND_MESSAGE, SHOW_MODAL, CLOSE_MODAL } from '../actions/inboxAction'

export default function (
    state = {
        messages: [],
        show: false
    }, action) {
    console.log("state in inbox reducer", state)
    switch (action.type) {
        case GET_MESSAGE:
            return {
                messages: action.messages,
                show: state.show
            }
        case SEND_MESSAGE:
            return {
                messages: state.messages,
                show: action.show
            }
        case SHOW_MODAL:
            return {
                messages: state.messages,
                show: action.show
            }
        case CLOSE_MODAL:
            return {
                messages: state.messages,
                show: action.show
            }
        default:
            return state;
    }
}