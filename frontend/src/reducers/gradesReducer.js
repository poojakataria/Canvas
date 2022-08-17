import { GRADES } from '../actions/gradesAction';

export default function (
    state = {
        grades: []
    }, action) {
    console.log("state in grades reducer", state)
    switch (action.type) {
        case GRADES:
            return {
                grades: action.grades
            }
        default:
            return state;
    }
}

