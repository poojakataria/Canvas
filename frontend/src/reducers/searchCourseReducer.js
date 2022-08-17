import { SEARCH_COURSES, EMPTY_COURSE } from '../actions/searchCourseAction';

export default function (
    state = {
        courses: []
    }, action) {
    console.log("state in search course reducer", state)
    switch (action.type) {
        case SEARCH_COURSES:
            return {
                courses: action.courses
            }
        case EMPTY_COURSE:
            return {
                courses: action.courses
            }
        default:
            return state;
    }
}


