
import axios from "axios";
import { BACKEND_URL } from "../components/config"

export const SUBMIT_LOGIN = "submit_login";


export function submitLogin(data, callback) {
    return dispatch => {
        console.log(data)

        axios.defaults.withCredentials = true;
        axios.post('http://' + BACKEND_URL + ':8080/login', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log(response.data);
                    if (response.data === 'Incorrect') {
                        callback(response);
                        dispatch({
                            type: SUBMIT_LOGIN,
                            sjsuid: '',
                            role: ''
                        })
                    }
                    else {

                        let data = response.data;
                        let role = data.role;
                        let sjsuid = data.sjsuid;
                        localStorage.setItem("token", data.token);
                        console.log(role, sjsuid, data.token);
                        callback(response);
                        dispatch({
                            type: SUBMIT_LOGIN,
                            sjsuid: sjsuid,
                            role: role
                        });
                    }
                } else {
                    console.log("inside else");
                }
            });
    }
}