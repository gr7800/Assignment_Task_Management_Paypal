import { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from "./auth.types";

let token = localStorage.getItem("user");
const intialState = {
    isAuth: false,
    token: token,
    user: {},
    loading: false,
    error: false,
    errorMessage: "",
};

export const authReducer = (state = intialState, { type, payload }) => {
    switch (type) {
        case LOGIN_REQUEST: {

            return {
                ...state,
                loading: true,
                error: false
            }
        }
        case LOGIN_SUCCESS: {
            localStorage.setItem("user",JSON.stringify(payload.userpersent));
            localStorage.setItem("token",JSON.stringify(payload.token));
            return {
                ...state,
                isAuth: true,
                token:payload.token,
                user: payload.userpersent,
                loading: false,
                error: false,
            }
        }
        case LOGIN_ERROR: {

            return {
                ...state,
                isAuth: false,
                loading: false,
                error: true,
                errorMessage: payload
            }
        }

        case LOGOUT: {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            return {
                ...state,
                isAuth: false,
                user: "",
            }
        }
        default: {
            return state;
        }
    }
}