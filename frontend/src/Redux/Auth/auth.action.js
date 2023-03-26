// import axios from "axios";
import { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from "./auth.types";

export const login = (creds) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST })
  console.log(creds,"hii")
  try {
    const response = await fetch("https://paypal-j03v.onrender.com/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    });
    const data = await response.json();
    dispatch({ type: LOGIN_SUCCESS, payload: data })
    alert(data.message);
      // console.log(response.data)
    return data;
     
  }
  catch (e) {
      dispatch({ type: LOGIN_ERROR, payload: e.message })
      console.log(e)
  }
}


const authlogout = () => ({type : LOGOUT});

export default authlogout;
