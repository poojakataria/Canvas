import { LECTURE_FILES } from '../actions/lectureFilesAction';

export default function (
    state = {
        files: []
    }, action) {
    console.log("state in lecturefile reducer", state)
    switch (action.type) {
        case LECTURE_FILES:
            return {
                files: action.files
            }
        default:
            return state;
    }
}

