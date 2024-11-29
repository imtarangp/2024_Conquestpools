import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILED,
  AUTH_LOGOUT_SUCCESS,
} from "../constants/auth";
import useJwt from "../../services/authService/auth/useJwt";
import { Toast } from "../../utils/alert";
const config = useJwt.jwtConfig;

const authLoginRequest = () => ({
  type: AUTH_LOGIN_REQUEST,
});
const authLoginSuccess = (userData) => ({
  type: AUTH_LOGIN_SUCCESS,
  payload: { ...userData },
});
const authLoginFailed = (message) => ({
  type: AUTH_LOGIN_FAILED,
  payload: { data: message },
});
const authLogoutSuccess = () => ({
  type: AUTH_LOGOUT_SUCCESS,
});
export const authLogoutAsync = (history) => {
  return (dispatch) => {
    dispatch(authLogoutSuccess());
  };
};

export const authLoginStartAsync = (data, navigate) => (dispatch) => {
  dispatch(authLoginRequest());
  const payload = {
    userName: data?.userName,
    password: data?.password,
  };
  useJwt
    .login(payload)
    .then((res) => {
      dispatch(
        authLoginSuccess({
          data: res?.data?.data?.userName,
          config,
          msg: "Login Success",
          [config.storageTokenKeyName]:
            res?.data?.data[config.storageTokenKeyName],
        })
      );
      Toast("success", `Welcome back ${res?.data?.data?.userName}`);
    })
    .catch((error) => {
      Toast(
        "error",
        error?.response?.data?.message ||
          "Please check your internet connection and try again"
      );
      dispatch(authLoginFailed(error?.message));
    });
};
