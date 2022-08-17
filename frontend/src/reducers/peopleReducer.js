import { PEOPLE, CLOSE_MODAL } from '../actions/peopleAction';

export default function (
    state = {
        students: [],
        show: false
    }, action) {
    console.log("state in people home reducer", state)
    switch (action.type) {
        case PEOPLE:
            return {
                students: action.students,
                show: action.show
            }
        case CLOSE_MODAL:
            return {
                students: state.students,
                show: action.show
            }
        default:
            return state;
    }
}


