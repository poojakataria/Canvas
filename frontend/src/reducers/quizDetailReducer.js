import { QUIZ_DETAIL } from '../actions/quizDetailAction';

export default function (
    state = {
        quizInfo: []
    }, action) {
    console.log("state in quiz detail reducer", state)
    switch (action.type) {
        case QUIZ_DETAIL:
            return {
                quizInfo: action.quizInfo
            }
        default:
            return state;
    }
}

