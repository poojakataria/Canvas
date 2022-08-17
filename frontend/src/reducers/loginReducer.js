import { SUBMIT_LOGIN } from '../actions/loginAction';


export default function (state = {}, action) {
    switch (action.type) {
        case SUBMIT_LOGIN:
            return {
                sjsuid: action.sjsuid,
                role: action.role
            }
        default:
            return state;
    }
}
