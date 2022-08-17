import { MAIN_COURSES } from '../actions/mainCourseAction';

export default function (
    state = {
        courses: []
    }, action) {
    console.log("state in main courses reducer", state)
    switch (action.type) {
        case MAIN_COURSES:
            return {
                courses: action.courses
            }
        default:
            return state;
    }
}