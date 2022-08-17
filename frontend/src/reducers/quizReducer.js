import { QUIZ, SHOW_QUIZ } from '../actions/quizAction';

export default function (
    state = {
        quizInfo: [],
        show: false
    }, action) {
    console.log("state in quiz reducer", state)
    switch (action.type) {
        case QUIZ:
            return {
                quizInfo: action.quizInfo,
                show: false
            }
        case SHOW_QUIZ:
            return {
                show: action.show,
                quizInfo: state.quizInfo,
            }
        default:
            return state;
    }
}

