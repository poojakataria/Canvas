import axios from "axios";
import { BACKEND_URL } from "../components/config"

//export const SUBMIT_LOGIN = "submit_login";

export function signUp(data, callback) {
    return dispatch => {
        console.log(data)

        axios.defaults.withCredentials = true;
        axios.post('http://' + BACKEND_URL + ':8080/newUser', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    callback(response);
                    //this.props.history.push('/Login');
                }
            });
    }
}