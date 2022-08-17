import axios from "axios";
import { BACKEND_URL } from "../components/config"
export const FETCH_PROFILE = "fetch_profile";
export const UPDATE_PROFILE = "update_profile";
export const UPLOAD_IMAGE = "upload_image";
export const ENABLE_EDITING = "enable_editing"
const DEFAULT_IMAGE_URL = 'uploads/unknown.jpg'

export function fetchProfile(sjsuid) {
    return dispatch => {
        console.log(sjsuid)
        var token = localStorage.getItem("token");
        console.log("token in fetchProfile", token)

        axios.get('http://' + BACKEND_URL + ':8080/UserProfile', {
            headers: { "Authorization": `Bearer ${token}` },
            params: { sjsuid: sjsuid }
        })
            .then((response) => {
                console.log("response data from userProfile", response.data);
                let result = response.data;
                if (result.length > 0 && result[0] != null) {
                    dispatch({
                        type: FETCH_PROFILE,
                        imageUrl: !result[0].image ? DEFAULT_IMAGE_URL : result[0].image,
                        name: result[0].name,
                        email: result[0].email,
                        phone: result[0].phone,
                        aboutMe: result[0].aboutme,
                        city: result[0].city,
                        country: result[0].country,
                        company: result[0].company,
                        school: result[0].school,
                        hometown: result[0].hometown,
                        languages: result[0].languages,
                        gender: result[0].gender,
                        disabled: true
                    })
                }
            });
    }
}

export function updateProfile(data, sjsuid) {
    console.log("data in action from updateProfile", data)
    var token = localStorage.getItem("token");
    return dispatch => {
        axios.post('http://' + BACKEND_URL + ':8080/UpdateProfile', data, {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then(response => {
                console.log(response);
                dispatch(
                    fetchProfile(sjsuid)
                )
            });
    }
}

export function uploadImage(data) {
    console.log("data in action from updateProfile", data)
    var token = localStorage.getItem("token");
    return dispatch => {
        axios.post('http://' + BACKEND_URL + ':8080/UploadImage', data, {
            headers: { "Authorization": `Bearer ${token}` }
        }).
            then(response => {
                console.log(response.data)
                dispatch(
                    {
                        type: UPLOAD_IMAGE,
                        imageUrl: response.data.imageUrl
                    }
                )
            })
    }
}

export function enableEditing() {
    return {
        type: ENABLE_EDITING,
        isVisible: true,
        disabled: false
    }
}