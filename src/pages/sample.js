//authaction.js
export const middlewareLogin = (user) => {
    return (dispatch) => {
        // redux thunk will give you the dispatch
        dispatch(request()); // loading is on, it will be more useful when you have backend later
        try {
            if (!user || !user.email || !user.password) {
                // fail situation
                console.log("error here", user);
                dispatch(fail("you didnt give us email or password"));
                return;
            }
            dispatch(login(user)); // success situation
            dispatch(success());
        } catch (err) {
            dispatch(fail(err.message)); // any fail in the middle of process (fetch or network or auth .. )
        }
    };
};

//authreducer.js
function reducer(state = initialstate, action) {
    switch (action.type) {
        case "LOGIN":
            state.user = action.payload;
            state.user.isAuthenticated = true;
            state.error = "";
            break;
        case "LOGIN_REQUEST":
            state.loading = true;
            break;

        case "LOGIN_SUCCESS":
            state.loading = false;
            break;
        case "LOGIN_FAILURE":
            state.loading = false;
            state.error = action.payload;
            state.user.isAuthenticated = false;
            break;
    }
    console.log("state", state, "user", state.user);

    return { ...state };
}

export default reducer;