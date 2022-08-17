export const USER_LOGOUT = "user_logout";


export function logout(callback) {
    return dispatch => {
        console.log("inside logout action")
        callback()
        dispatch({
            type: USER_LOGOUT
        })
    }
}