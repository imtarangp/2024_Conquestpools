import {
  AUTH_LOGIN_FAILED,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT_SUCCESS,
} from "../constants/auth";

const initialState = {
  userData: {},
  isLoggedIn: false,
  errMsg: "",
  successMsg: "",
  isLoadingAuth: false,
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH_LOGIN_REQUEST:
      return {
        ...state,
        isLoadingAuth: true,
      };
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        isLoadingAuth: false,
        successMsg: payload.msg,
        userData: {
          userName: payload?.data,
          [payload.config.storageTokenKeyName]:
            payload[payload.config.storageTokenKeyName],
        },
        isLoggedIn: true,
      };
    case AUTH_LOGIN_FAILED:
      return {
        ...state,
        isLoadingAuth: false,
        errMsg: payload.data,
      };
    case AUTH_LOGOUT_SUCCESS:
      return {
        ...state,
        userData: {},
        isLoggedIn: false,
      };
    default:
      return state;
  }
};
export default authReducer;
