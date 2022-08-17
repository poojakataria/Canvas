import { ASSIGNMENT, SHOW_FORM, LOAD_ASSIGNMENT, VIEW_UPLOAD, VIEW_ASSIGNMENT } from '../actions/assignmentAction';

export default function (
    state = {
        assignment: [],
        show: false,
        view: true,
        assignmentUrl: '',
        assignmentFileName: '',
        assignmentSubmissionId: 0
    }, action) {
    console.log("state in  assignment reducer", state)
    switch (action.type) {
        case ASSIGNMENT:
            return {
                assignment: action.assignment,
                show: false,
                view: true
            }
        case SHOW_FORM:
            return {
                assignment: state.assignment,
                show: action.show,
                view: true
            }
        case VIEW_UPLOAD:
            return {
                assignment: state.assignment,
                show: state.show,
                view: action.view
            }
        case LOAD_ASSIGNMENT:
            return {
                assignment: state.assignment,
                show: state.show,
                view: action.view
            }
        case VIEW_ASSIGNMENT:
            return {
                assignment: state.assignment,
                show: state.show,
                view: true,
                assignmentUrl: action.assignmentUrl,
                assignmentFileName: action.assignmentFileName,
                assignmentSubmissionId: action.assignmentSubmissionId
            }
        default:
            return state;
    }
}
