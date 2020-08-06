function login(user) {
    return { type: "LOGIN", payload: user };
}
function loginFail(message) {
    return { type: "LOGIN_FAIL", payload: message };
}

// function loginSuccess() {
//     return { type: "LOGIN_SUCCESS", payload: null };
// }

function loginMiddleware(user) {
    return (dispatch) => {
        try {
            if (!user.email || !user.password) {
                dispatch(loginFail("Please give your information"))
                return;
            } else {
                dispatch(login(user)); // login success
                // dispatch(loginSuccess());
            }
        } catch (error) {
            dispatch(loginFail(error.message));
        }
    }
}

export default loginMiddleware;