import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import loginReducer from "./loginReducer";
import userProfileReducer from "./userProfileReducer";
import signUpReducer from "./signUpReducer";
import dashboardReducer from "./dashboardReducer";
import mainCourseReducer from "./mainCourseReducer";
import searchCourseReducer from "./searchCourseReducer";
import createCourseReducer from "./createCourseReducer";
import courseHomeReducer from "./courseHomeReducer";
import peopleReducer from "./peopleReducer";
import assignmentReducer from "./assignmentReducer";
import viewSubmissionReducer from "./viewSubmissionReducer";
import announcementReducer from "./announcementReducer";
import lectureFilesReducer from "./lectureFilesReducer";
import quizReducer from "./quizReducer";
import quizDetailReducer from "./quizDetailReducer";
import gradesReducer from "./gradesReducer";
import { USER_LOGOUT } from "../actions/logoutAction";
import searchResultsReducer from "./searchResultsReducer";
import inboxReducer from "./inboxReducer";

const appReducer = combineReducers({
    form: formReducer,
    login: loginReducer,
    userProfile: userProfileReducer,
    signUp: signUpReducer,
    dashboard: dashboardReducer,
    mainCourse: mainCourseReducer,
    searchCourse: searchCourseReducer,
    searchResults: searchResultsReducer,
    createCourse: createCourseReducer,
    courseHome: courseHomeReducer,
    people: peopleReducer,
    assignment: assignmentReducer,
    viewSubmission: viewSubmissionReducer,
    announcement: announcementReducer,
    lectureFiles: lectureFilesReducer,
    quiz: quizReducer,
    quizDetail: quizDetailReducer,
    grades: gradesReducer,
    inbox: inboxReducer
});

const rootReducer = (state, action) => {
    console.log("in root reducer main", action.type)
    if (action.type === USER_LOGOUT) {
        console.log("inside root reducer")
        state = undefined
    }
    return appReducer(state, action)
}

export default rootReducer;
