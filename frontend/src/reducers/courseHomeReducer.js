import { COURSE_HOME } from '../actions/courseHomeAction';

export default function (
    state = {
        courseInformation: []
    }, action) {
    console.log("state in course home reducer", state)
    switch (action.type) {
        case COURSE_HOME:
            return {
                courseInformation: action.courseInformation
            }
        default:
            return state;
    }
}


