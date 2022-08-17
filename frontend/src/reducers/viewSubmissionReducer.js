import { VIEW_SUBMISSION } from '../actions/viewSubmissionAction';

export default function (
    state = {
        submissions: [],
        grade: ''
    }, action) {
    console.log("state in view submission reducer", state)
    switch (action.type) {
        case VIEW_SUBMISSION:
            return {
                submissions: action.submissions,
                grade: ''
            }
        default:
            return state;
    }
}

