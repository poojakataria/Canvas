import axios from "axios";
import { BACKEND_URL } from "../components/config"
export const SEARCH_COURSES = "search_courses";
export const EMPTY_COURSE = "empty_course";

export function searchCourses(searchData) {
    var token = localStorage.getItem("token");
    return dispatch => {
        axios.get('http://' + BACKEND_URL + ':8080/SearchCourses', {
            headers: { "Authorization": `Bearer ${token}` },
            params: { searchData: searchData }
        })
            .then((response) => {
                console.log("response data from SearchCourses", response.data);
                dispatch({
                    type: SEARCH_COURSES,
                    courses: response.data
                })
            });
    }
}

export function emptySearch() {
    return ({
        type: EMPTY_COURSE,
        courses: []
    })
}


