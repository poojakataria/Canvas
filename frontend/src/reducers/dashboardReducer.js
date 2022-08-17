import { ENROLLED_COURSES, SORT_END } from '../actions/dashboardAction';

export default function (
    state = {
        courses: []
    }, action) {
    console.log("state in reducer", state)
    switch (action.type) {
        case ENROLLED_COURSES:
            return {
                courses: action.courses
            }
        case SORT_END:
            return {
                courses: action.courses
            }
        default:
            return state;
    }
}


