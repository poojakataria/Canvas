import { ENROLL_IN_COURSE, ENROLL_IN_WAITLIST, COURSE_RESULTS } from '../actions/searchResultsAction';

export default function (
    state = {
        courseResults: []
    }, action) {
    console.log("state in search result reducer", state)
    switch (action.type) {
        case ENROLL_IN_COURSE:
            return {
                courseResults: action.courseResults
            }
        case ENROLL_IN_WAITLIST:
            return {
                courseResults: action.courseResults
            }
        case COURSE_RESULTS:
            return {
                courseResults: action.courseResults
            }
        default:
            return state;
    }
}


