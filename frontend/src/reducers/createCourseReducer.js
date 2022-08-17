import { CREATE_COURSE } from '../actions/createCourseAction';

export default function (
    state = {
        courses: []
    }, action) {
    console.log("state in create course reducer", state)
    switch (action.type) {
        case CREATE_COURSE:
            return {
                courses: action.courses
            }
        default:
            return state;
    }
}


