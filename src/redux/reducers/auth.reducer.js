import { authConstants } from "../actions/constants";

const initialState = {
  token: "",
  user: {
    firstName: "",
    lastName: "",
    email: "",
    picture: "",
  },
  authenticate: false,
  authenticating: false,
  loading: false,
  error: null,
  message: ''
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      return (state = {
        ...state,
        authenticating: true,
      });
    case authConstants.LOGIN_SUCCESS:
      return (state = {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        authenticate: true,
        authenticating: false,
      });
    case authConstants.LOGOUT_REQUEST:
      return (state = {
        ...state,
        loading: true
      });
    case authConstants.LOGOUT_SUCCESS:
      return (state = {
        ...initialState,
      });
    case authConstants.LOGOUT_FAILURE:
      return (state = {
        ...state,
        error: action.payload.error,
        loading: false
      });

    default:
      return state;
  }
};

export default authReducer;
