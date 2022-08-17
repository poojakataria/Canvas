import { ANNOUNCEMENT, SHOW_FORM } from '../actions/announcementAction';

export default function (
    state = {
        announcement: [],
        show: false
    }, action) {
    console.log("state in announcement reducer", state)
    switch (action.type) {
        case ANNOUNCEMENT:
            return {
                announcement: action.announcement,
                show: action.show
            }
        case SHOW_FORM:
            return {
                announcement: state.announcement,
                show: action.show
            }
        default:
            return state;
    }
}

