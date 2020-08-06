let initialState = {
  user:
  {
    email: "",
    password: "",
    isAuthenticated: false,
  },
  error: "",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN": //success
      state.user.email = action.payload.email;
      state.user.password = action.payload.password;
      state.user.isAuthenticated = true;
      state.error = "";
      break;

    case "LOGIN_FAIL":
      state.error = action.payload;
      break;

    // case "LOGIN_SUCCESS":
    //    state.error = "";
    //   break;
  }
  console.log("state", state);
  return { ...state };
}

export default reducer;