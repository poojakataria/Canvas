import axios from 'axios'
import { BACKEND_URL } from "../components/config"
export const ENROLL_IN_COURSE = "enroll_in_course"
export const ENROLL_IN_WAITLIST = "enroll_in_waitlist"
export const COURSE_RESULTS = "course_results"

export function enrollInCourse(data) {
    var token = localStorage.getItem("token");
    return dispatch => {
        axios.post('http://' + BACKEND_URL + ':8080/Enroll', data,
            { headers: { "Authorization": `Bearer ${token}` } })
            .then(response => {
                if (response.data === 'Course Added') {
                    var index = data.courses.map(function (course) {
                        return course.id.toString();
                    }).indexOf(data.courseid);

                    if (index === -1) {
                        console.log("Course Not Found");
                    } else {
                        data.courses[index].enrolled = true;
                        dispatch({
                            type: ENROLL_IN_COURSE,
                            courseResults: data.courses
                        })
                    }
                }
            });
    }
}

export function enrollInWaitlist(data) {
    var token = localStorage.getItem("token");
    return dispatch => {
        axios.post('http://' + BACKEND_URL + ':8080/EnrollWaitlist', data,
            {
                headers: { "Authorization": `Bearer ${token}` }
            })
            .then(response => {
                if (response.data === 'Course Added') {
                    var index = data.courses.map(function (course) {
                        return course.id.toString();
                    }).indexOf(data.courseid);

                    if (index === -1) {
                        console.log("Course Not Found");
                    } else {
                        data.courses[index].waitlisted = true;
                        dispatch({
                            type: ENROLL_IN_WAITLIST,
                            courseResults: data.courses
                        })
                    }
                }
            });
    }
}

export function getCourseResults(courses) {
    return ({
        type: COURSE_RESULTS,
        courseResults: courses
    })
}