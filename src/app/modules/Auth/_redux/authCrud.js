import axios from "axios";
import { BASE_URL } from "../../../Common/CRUD";

// export const LOGIN_URL = "api/auth/login";
export const LOGIN_URL = BASE_URL + "auth/signin";

export const REGISTER_URL = "api/auth/register";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";

export const ME_URL = "api/me";

export function login(userName, password) {
  return axios.post(LOGIN_URL, {
    username: userName,
    password,
  });
}

export function register(email, fullname, username, password) {
  return axios.post(REGISTER_URL, { email, fullname, username, password });
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  return user;
}
